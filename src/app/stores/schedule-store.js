import { observable, action, computed } from 'mobx';

class ScheduleStore {
  @observable
  schedules = [];
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
}

export default ScheduleStore;
