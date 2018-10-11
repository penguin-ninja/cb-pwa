import { observable, action, computed } from 'mobx';

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
  @observable
  batchMode = [];

  assignment = [
    {
      value: 'Weighed',
      text: 'Weighed'
    },
    {
      value: 'Metered',
      text: 'Metered'
    },
    {
      value: 'None',
      text: 'Unassigned'
    }
  ];

  @observable
  materials = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  get api() {
    return this.rootStore.authStore;
  }

  get plantId() {
    return this.rootStore.authStore.plantId;
  }

  getMaterialById = id => this.materials.find(m => m.id === id);

  @action
  loadMaterials() {
    return this.api
      .makeAuthorizedRequest(`/api/batch/Material/plant/${this.plantId}`)
      .then(resp => {
        this.materials = resp;
      });
  }

  @action
  loadMaterialDetail(materialId) {
    return this.api.makeAuthorizedRequest(
      `/api/batch/Material/plant/${this.plantId}/material/${materialId}`
    );
  }

  @action
  loadTypes() {
    return Promise.all([
      this.loadType('relationType'),
      this.loadType('startType'),
      this.loadType('weighedMaterialType'),
      this.loadType('meteredMaterialType'),
      this.loadType('batchMode'),
      this.loadType('weightUnit', 'config/ConfigType'),
      this.loadType('meterUnit', 'config/ConfigType')
    ]);
  }

  @action
  loadType(type, path = 'batch/BatchType') {
    return this.api.makeAuthorizedRequest(`/api/${path}/${type}`).then(resp => {
      this[type] = resp;
    });
  }

  @action
  assignMaterial = (materialId, assignment) => {
    return this.api
      .makeAuthorizedRequest(
        `/api/batch/Material/plant/${
          this.plantId
        }/material/${materialId}/assignment/${assignment}`,
        {},
        'POST'
      )
      .then(() => {
        this.onMaterialUpdate(materialId, {
          assignment
        });
      });
  };

  @action
  unassignMaterial = materialId => {
    return this.api
      .makeAuthorizedRequest(
        `/api/batch/Material/plant/${this.plantId}/material/${materialId}`,
        {},
        'DELETE'
      )
      .then(() => {
        this.onMaterialUpdate(materialId, {
          assignment: 'None'
        });
      });
  };

  @action
  saveMaterialDetail = (material, values) => {
    const { id, assignment } = material;
    const type =
      assignment === 'Weighed' ? 'weighedMaterial' : 'meteredMaterial';

    return this.api.makeAuthorizedRequest(
      `/api/batch/Material/plant/${this.plantId}/${type}/${id}`,
      values,
      'PUT'
    );
  };

  @action
  adjustQuantity = (materialId, payload) => {
    return this.api
      .makeAuthorizedRequest(
        `/api/items/Inventory/plant/${
          this.plantId
        }/inventoryItem/${materialId}/adjust`,
        payload,
        'POST'
      )
      .then(data => {
        this.onMaterialUpdate(materialId, data);
        return data;
      });
  };

  @action
  onMaterialUpdate = (materialId, updatedData) => {
    const material = this.getMaterialById(materialId);

    if (material) {
      Object.assign(material, updatedData);
    }
  };

  @computed
  get unassignedMaterials() {
    return this.materials.filter(m => m.assignment === 'None');
  }

  @computed
  get weighedMaterials() {
    return this.materials.filter(m => m.assignment === 'Weighed');
  }

  @computed
  get meteredMaterials() {
    return this.materials.filter(m => m.assignment === 'Metered');
  }
}

export default MaterialStore;
