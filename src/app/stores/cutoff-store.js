import { observable, action, computed } from 'mobx';

class CutoffStore {
  @observable
  cutoffTable = {};
  @observable
  materialId = null;
  @observable
  loading = false;
  @observable
  saving = false;

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
  get isModalVisible() {
    return !!this.materialId;
  }

  @computed
  get cutoffArray() {
    const arr = [];
    for (let i = 1; i <= 20; i += 1) {
      arr.push({
        id: i,
        freeFall: this.cutoffTable[`freeFall${i}`],
        dropSize: this.cutoffTable[`dropSize${i}`]
      });
    }

    return arr;
  }

  getValue = (id, field) => {
    return this.cutoffTable[`${field}${id}`];
  };

  @action
  reset() {
    this.loading = false;
    this.saving = false;
    this.materialId = null;
    this.cutoffTable = {};
  }

  @action
  loadCutoff() {
    this.loading = true;
    return this.api
      .makeAuthorizedRequest(
        `/api/batch/Material/plant/${this.plantId}/weighedMaterial/${
          this.materialId
        }/cutOffTable`
      )
      .then(resp => {
        this.loading = false;
        this.cutoffTable = resp;
      });
  }

  @action
  saveCutoff = () => {
    this.saving = true;

    return this.api
      .makeAuthorizedRequest(
        `/api/batch/Material/plant/${this.plantId}/weighedMaterial/${
          this.materialId
        }/cutOffTable`,
        this.cutoffTable,
        'PUT'
      )
      .then(resp => {
        this.saving = false;
        this.onCloseModal();
      });
  };

  generateInterpolation(start, end) {
    const countDiff = end - start;
    const freeFallDiff =
      this.getValue(end, 'freeFall') - this.getValue(start, 'freeFall');
    const diff = Math.ceil(freeFallDiff / countDiff);
    const startFreeFall = this.getValue(start, 'freeFall');

    for (let i = start + 1; i < end; i += 1) {
      const freeFall = (startFreeFall + diff * (i - start)).toFixed(2);
      this.changeCutoff(i, 'freeFall', freeFall);
    }
  }

  @action
  interpolate = () => {
    let startId = 1;

    for (let i = 2; i <= 20; i += 1) {
      const freeFall = this.getValue(i, 'freeFall');

      if (freeFall > 0) {
        if (i - startId > 1) {
          this.generateInterpolation(startId, i);
        }
        startId = i;
      }
    }
  };

  @action
  generate = () => {
    for (let i = 1; i <= 20; i += 1) {
      this.changeCutoff(i, 'dropSize', (1 * i).toFixed(2));
    }
  };

  @action
  changeCutoff = (id, fieldName, value) => {
    this.cutoffTable[`${fieldName}${id}`] = value * 1;
  };

  @action
  onShowModal = materialId => {
    this.materialId = materialId;
    this.loadCutoff();
  };

  @action
  onCloseModal = () => {
    this.reset();
  };
}

export default CutoffStore;
