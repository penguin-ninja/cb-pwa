import { observable, action } from 'mobx';

class DevicesStore {
  @observable
  deviceTypes = [];
  @observable
  devices = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  get api() {
    return this.rootStore.authStore;
  }

  @action
  loadDeviceTypes() {
    return this.api
      .makeAuthorizedRequest('/api/batch/BatchType/deviceTypeName')
      .then(resp => {
        this.deviceTypes = resp;
      });
  }

  @action
  loadDevicesConfigurations() {}
}

export default DevicesStore;
