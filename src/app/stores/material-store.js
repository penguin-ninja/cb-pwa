import { observable, action } from 'mobx';

class MaterialStore {
  @observable
  relationType = [];
  @observable
  startType = [];
  @observable
  weighedMaterialType = [];
  @observable
  meteredMaterialType = [];
  @observable
  weightUnit = [];
  @observable
  meterUnit = [];

  // modal
  @observable
  isModalVisible = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  get api() {
    return this.rootStore.authStore;
  }

  @action
  loadTypes() {
    return Promise.all([
      this.loadType('relationType'),
      this.loadType('startType'),
      this.loadType('weighedMaterialType'),
      this.loadType('meteredMaterialType'),
      this.loadType('weightUnit', 'config/ConfigType'),
      this.loadType('meterUnit', 'config/ConfigType')
    ]);
  }

  @action
  loadType(type, path = 'batch/BatchType') {
    return this.api.makeAuthorizedRequest(`/api/${path}/${type}`).then(resp => {
      this[type] = type;
    });
  }

  @action
  onShowModal = () => {
    this.isModalVisible = true;
  };

  @action
  onCloseModal = () => {
    this.isModalVisible = false;
  };
}

export default MaterialStore;
