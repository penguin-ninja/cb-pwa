import { observable, action, computed, extendObservable } from 'mobx';
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
  createDevice(deviceType, device) {
    return this.api
      .makeAuthorizedRequest(
        `/api/batch/DeviceManager/plant/${this.plantId}/${deviceType}`,
        {
          [deviceType]: device
        },
        'POST'
      )
      .then(() => {
        this.devices[deviceType] = this.devices[deviceType] || [];
        this.devices[deviceType].push(device);
      });
  }

  @action
  updateDevice(deviceId, deviceType, device) {
    // NOTE check if this API requires all properteis
    return this.api
      .makeAuthorizedRequest(
        `/api/batch/DeviceManager/${deviceType}/${deviceId}`,
        {
          [deviceType]: device
        },
        'PUT'
      )
      .then(() => {
        const index = this.devices[deviceType].findIndex(
          d => d.id === deviceId
        );

        if (index > -1) {
          extendObservable(this.devices[deviceType][index], device);
        }
      });
  }

  @action
  deleteDevice(deviceId, deviceType) {
    return this.api
      .makeAuthorizedRequest(
        `/api/batch/DeviceManager/${deviceId}`,
        null,
        'DELETE'
      )
      .then(() => {
        this.devices[deviceType] = this.devices[deviceType].filter(
          d => d.id !== deviceId
        );
      });
  }

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
