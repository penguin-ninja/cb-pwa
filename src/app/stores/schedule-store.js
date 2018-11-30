import { observable, action, computed } from 'mobx';
import moment from 'moment';

class ScheduleStore {
  @observable
  schedules = ['', '', ''];
  @observable
  loading = false;
  @observable
  saving = false;

  @observable
  editingScheduleId = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  get api() {
    return this.rootStore.authStore;
  }

  get plantId() {
    return this.rootStore.authStore.plantId;
  }

  getScheduleById = id => this.schedules.find(s => s.id === id);

  @action
  onEdit = scheduleId => {
    this.editingScheduleId = scheduleId;
  };

  @action
  onClose = () => {
    this.editingScheduleId = null;
  };

  @action
  loadSchedules = () => {
    this.loading = true;
    // NOTE uses large number of take since we don't support pagination here
    return this.api
      .makeAuthorizedRequest(
        `/api/batch/Schedule/plant/${this.plantId}/schedules`,
        {
          dateFrom: moment(this.dateFrom).format(),
          dateTo: moment(this.dateTo).format(),
          skip: 0,
          take: 1000
        }
      )
      .then(resp => {
        this.loading = false;
        this.schedules = resp;
      });
  };

  @action
  addSchedule = data => {};

  @action
  updateSchedule = (id, data) => {};
}

export default ScheduleStore;
