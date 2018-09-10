import { observable, action, computed } from 'mobx';
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

  defaultGUI = {
    x: 0,
    y: 0,
    z: 0,
    size: 100,
    length: 100
  };

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

  getDeviceGUIById = id => {
    return (
      this.deviceGUIs.find(d => d.id === id) || {
        ...this.defaultGUI,
        deviceId: id
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
      .makeAuthorizedRequest(`/api/batch/DeviceGui/plant/${this.plantId}`)
      .then(resp => {
        this.deviceGUIs = resp;
      });
  }

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
        `/api/batch/DeviceManager/${deviceType}/${deviceId}`,
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
  deleteDevice = (deviceId, deviceType) => {
    return this.api
      .makeAuthorizedRequest(
        `/api/batch/DeviceManager/${deviceId}`,
        null,
        'DELETE'
      )
      .then(() => {
        this.devices = this.devices.filter(
          d => d.id !== deviceId && d.deviceTypeName === deviceType
        );
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
