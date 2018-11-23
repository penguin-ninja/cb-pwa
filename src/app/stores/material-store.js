import { observable, action, computed } from 'mobx';
import get from 'lodash/get';

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
  unit = [];
  @observable
  batchMode = [];
  @observable
  materialDetails = {};

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

  @computed
  get weighUnit() {
    return this.unit.filter(u => u);
  }

  @computed
  get meterUnit() {
    return this.unit.filter(u => u);
  }

  getMaterialById = id => this.materials.find(m => Number(m.id) === Number(id));

  getMaterialUnit = id => {
    const material = this.getMaterialById(id);
    const unitId = get(this.materialDetails, `${id}.inventoryUnitId`);

    if (!material || material.assignment === 'None') {
      return '';
    }

    if (material.assignment === 'Metered') {
      const unit = this.meterUnit.find(u => u.id === unitId);
      return unit && unit.name;
    } else if (material.assignment === 'Weighed') {
      const unit = this.weighUnit.find(u => u.id === unitId);
      return unit && unit.name;
    }
  };

  @action
  loadMaterials() {
    return this.api
      .makeAuthorizedRequest(`/api/batch/Material/plant/${this.plantId}`)
      .then(resp => {
        this.materials = resp;

        this.materials.forEach(m => {
          if (m.assignment !== 'None') {
            this.loadMaterialDetail(m.id);
          }
        });
      });
  }

  @action
  loadMaterialDetail(materialId) {
    return this.api
      .makeAuthorizedRequest(
        `/api/batch/Material/plant/${this.plantId}/material/${materialId}`
      )
      .then(detail => {
        this.materialDetails[materialId] = detail;
        return detail;
      });
  }

  @action
  loadTypes() {
    return Promise.all([
      this.loadType('relationType'),
      this.loadType('startType'),
      this.loadType('weighedMaterialType'),
      this.loadType('meteredMaterialType'),
      this.loadType('batchMode'),
      this.loadType('unit', 'config/ConfigType')
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
        'PUT'
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
