import { observable, action, computed } from 'mobx';
import moment from 'moment';

class ShipHistoryStore {
  @observable
  historyItems = [];
  @observable
  materialId = null;
  @observable
  loading = false;
  @observable
  saving = false;
  @observable
  isShipInVisible = false;
  @observable
  dateFrom = moment()
    .startOf('day')
    .subtract(1, 'month')
    .toDate();
  @observable
  dateTo = moment()
    .endOf('day')
    .toDate();

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
  get material() {
    if (this.materialId) {
      return this.rootStore.materialStore.getMaterialById(this.materialId);
    }

    return null;
  }

  @action
  loadHistory() {
    this.loading = true;
    return this.api
      .makeAuthorizedRequest(
        `/api/items/Inventory/plant/${this.plantId}/inventoryItem/${
          this.materialId
        }/history`,
        {
          dateFrom: moment(this.dateFrom).format(),
          dateTo: moment(this.dateTo).format()
        }
      )
      .then(resp => {
        this.loading = false;
        this.historyItems = resp;
      });
  }

  @action
  shipIn = (materialId, payload) => {
    this.saving = true;
    return this.api
      .makeAuthorizedRequest(
        `/api/items/Inventory/plant/${
          this.plantId
        }/inventoryItem/${materialId}/shipIn`,
        payload,
        'PUT'
      )
      .then(() => {
        this.saving = false;
        return this.loadHistory();
      });
  };

  @action
  handleChangeFilter = (field, value) => {
    this[field] = value;
    this.loadHistory();
  };

  // modal related
  @computed
  get isModalVisible() {
    return !!this.materialId;
  }

  @action
  onShipIn = () => {
    this.isShipInVisible = true;
  };

  @action
  onCloseShipIn = () => {
    this.isShipInVisible = false;
  };

  @action
  reset() {
    this.loading = false;
    this.saving = false;
    this.isShipInVisible = false;
    this.materialId = null;
    this.historyItems = [];
  }

  @action
  onShowModal = materialId => {
    this.materialId = materialId;
    this.loadHistory();
  };

  @action
  onCloseModal = () => {
    this.reset();
  };
}

export default ShipHistoryStore;
