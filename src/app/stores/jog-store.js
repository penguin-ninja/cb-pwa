import { observable, action, computed } from 'mobx';

class JogStore {
  @observable
  jogTable = {};
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
  get jogArray() {
    const arr = [];
    for (let i = 1; i <= 50; i += 1) {
      arr.push({
        id: i,
        open: this.jogTable[`open${i}`],
        weight: this.jogTable[`weight${i}`]
      });
    }

    return arr;
  }

  @action
  reset() {
    this.loading = false;
    this.saving = false;
    this.materialId = null;
    this.jogTable = {};
  }

  @action
  loadJog() {
    this.loading = true;
    return this.api
      .makeAuthorizedRequest(
        `/api/batch/Material/plant/${this.plantId}/weighedMaterial/${
          this.materialId
        }/jogTable`
      )
      .then(resp => {
        this.loading = false;
        this.jogTable = resp;
      });
  }

  @action
  saveJog = () => {
    this.saving = true;

    return this.api
      .makeAuthorizedRequest(
        `/api/batch/Material/plant/${this.plantId}/weighedMaterial/${
          this.materialId
        }/jogTable`,
        this.jogTable,
        'PUT'
      )
      .then(resp => {
        this.saving = false;
        this.onCloseModal();
      });
  };

  @action
  changeJog = (id, fieldName, value) => {
    this.jogTable[`${fieldName}id`] = value * 1;
  };

  @action
  onShowModal = materialId => {
    this.materialId = materialId;
    this.loadJog();
  };

  @action
  onCloseModal = () => {
    this.reset();
  };
}

export default JogStore;
