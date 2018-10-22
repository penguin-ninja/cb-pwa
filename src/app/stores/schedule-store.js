import { observable, action, computed } from 'mobx';

class ScheduleStore {
  @observable
  schedules = [];
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
}

export default ScheduleStore;
