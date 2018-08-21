import { observable, action, computed, extendObservable } from 'mobx';
import BATCH_TYPE_ENUMS from 'app/constants/BatchTypeEnums';

class DevicesStore {
  @observable
  deviceTypes = [];
  @observable
  devices = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.loadEnums();
    this.loadDevices();
  }

  get api() {
    return this.rootStore.authStore;
  }

  get plantId() {
    return this.rootStore.authStore.plantId;
  }

  @computed
  get devicesByType() {
    return this.deviceTypes.map(type =>
      this.devices.filter(d => d.deviceTypeName === type)
    );
  }

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
