import { observable, action, computed } from 'mobx';
import debounce from 'lodash/debounce';
import { confirm } from 'app/utils/modals';
import DEFAULT_GUI from 'app/constants/DefaultGUI';
import DEFAULT_NON_DEVICE_GUI from 'app/constants/DefaultNonDeviceGUI';
import BATCH_TYPE_ENUMS from 'app/constants/BatchTypeEnums';

class DevicesStore {
  @observable
  deviceTypeName = [];
  @observable
  devices = [];
  @observable
  isEditing = false;
  @observable
  editingDeviceId = null;
  @observable
  editingDeviceTypeName = null;
  @observable
  deviceGUIs = [];
  @observable
  guiLoaded = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  get api() {
    return this.rootStore.authStore;
  }

  get plantId() {
    return this.rootStore.authStore.plantId;
  }

  @computed
  get editingDevice() {
    return this.getDeviceById(this.editingDeviceId);
  }

  @computed
  get devicesByType() {
    const map = {};
    this.deviceTypeName.forEach(type => {
      map[type] = this.devices.filter(d => d.deviceTypeName === type);
    });
    return map;
  }

  getDeviceGUIById = (deviceId, type) => {
    return (
      this.deviceGUIs.find(d => `${d.iconName}` === `${deviceId}`) || {
        ...DEFAULT_GUI[type],
        iconName: `${deviceId}`
      }
    );
  };

  getNonDeviceGUIById = id => {
    return (
      this.deviceGUIs.find(d => `${d.iconName}` === `n-${id}`) || {
        ...DEFAULT_NON_DEVICE_GUI[id],
        iconName: `n-${id}`
      }
    );
  };

  getDeviceById = id => {
    return this.devices.find(d => d.id === id);
  };

  @action
  startEdit = (id, type) => {
    this.isEditing = true;
    this.editingDeviceId = id;
    this.editingDeviceTypeName = type;
  };

  @action
  cancelEdit = () => {
    this.isEditing = false;
    this.editingDeviceId = null;
    this.editingDeviceTypeName = null;
  };

  // devices CRUD
  @action
  loadDevices() {
    return this.api
      .makeAuthorizedRequest(`/api/batch/DeviceManager/plant/${this.plantId}`)
      .then(resp => {
        this.devices = resp;
      });
  }

  @action
  loadDeviceGUIs() {
    return this.api
      .makeAuthorizedRequest(`/api/batch/Gui/plant/${this.plantId}`)
      .then(resp => {
        this.guiLoaded = true;
        this.deviceGUIs = resp;
      });
  }

  @action
  upsertDeviceGUI(deviceId, type, params) {
    let gui = this.deviceGUIs.find(d => `${d.iconName}` === `${deviceId}`);

    if (!gui) {
      gui = {
        iconName: `${deviceId}`,
        ...DEFAULT_GUI[type],
        ...params
      };
      this.deviceGUIs.push(gui);
    } else {
      Object.assign(gui, params);
    }

    return this.debouncedSaveGUI(deviceId, gui);
  }

  @action
  upsertNonDeviceGUI(id, params) {
    let gui = this.deviceGUIs.find(d => `${d.iconName}` === `n-${id}`);

    if (!gui) {
      gui = {
        iconName: `n-${id}`,
        ...DEFAULT_NON_DEVICE_GUI[id],
        ...params
      };
      this.deviceGUIs.push(gui);
    } else {
      Object.assign(gui, params);
    }

    return this.debouncedSaveGUI(`n-${id}`, gui);
  }

  @action
  debouncedSaveGUI = debounce((id, params) => {
    return this.api.makeAuthorizedRequest(
      `/api/batch/Gui/plant/${this.plantId}/icon/${id}`,
      {
        x: parseInt(params.x, 10),
        y: parseInt(params.y, 10),
        z: parseInt(params.z, 10),
        length: parseInt(params.length, 10),
        size: parseInt(params.size, 10)
      },
      'POST'
    );
  }, 500);

  @action
  createDevice(deviceType, device) {
    return this.api
      .makeAuthorizedRequest(
        `/api/batch/DeviceManager/plant/${this.plantId}/${deviceType}`,
        device,
        'POST'
      )
      .then(newDevice => {
        this.devices.push(newDevice);
      });
  }

  @action
  updateDevice = (deviceId, deviceType, device) => {
    // NOTE check if this API requires all properteis
    return this.api
      .makeAuthorizedRequest(
        `/api/batch/DeviceManager/plant/${
          this.plantId
        }/${deviceType}/${deviceId}`,
        device,
        'PUT'
      )
      .then(() => {
        const index = this.devices.findIndex(
          d => d.id === deviceId && d.deviceTypeName === deviceType
        );

        if (index > -1) {
          this.devices[index] = {
            id: deviceId,
            ...device
          };
        }
      });
  };

  @action
  confirmDeleteDevice = (deviceId, deviceType) => {
    return confirm({
      title: `Are you sure you want to delete ${deviceType} #${deviceId}?`,
      okLabel: 'Yes',
      cancelLabel: 'No'
    })
      .then(() => {
        return this.deleteDevice(deviceId, deviceType);
      })
      .catch(() => {});
  };

  @action
  deleteDevice = (deviceId, deviceType) => {
    return this.api
      .makeAuthorizedRequest(
        `/api/batch/DeviceManager/plant/${this.plantId}/device/${deviceId}`,
        null,
        'DELETE'
      )
      .then(() => {
        this.devices = this.devices.filter(d => d.id !== deviceId);
      });
  };

  // Device Enums
  @action
  loadEnumConfiguration(key) {
    return this.api
      .makeAuthorizedRequest(`/api/batch/BatchType/${key}`)
      .then(resp => {
        this[key] = resp;
      });
  }

  @action
  loadEnums() {
    return Promise.all(
      BATCH_TYPE_ENUMS.map(type => this.loadEnumConfiguration(type))
    );
  }
}

export default DevicesStore;
