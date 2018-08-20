class LocalStorage {
  static mainKey = 'cloud-batch';
  data = {};

  constructor() {
    this.loadData();
  }

  load() {
    try {
      this.data = JSON.parse(window.localStorage.getItem(this.mainKey));
    } catch (e) {
      CONCRETE_LOGGER.error(e);
      CONCRETE_LOGGER.warn('There was problem loading data from local storage');
      this.data = {};
    }
  }

  save() {
    window.localStorage.setItem(this.mainKey, JSON.stringify(this.data));
  }

  getItem(key) {
    return this.data[key];
  }

  setItem(key, value) {
    Object.assign(this.data, {
      [key]: value
    });
    return this.save();
  }
}

const storage = new LocalStorage();
window.CONCRETE_STORAGE = storage;
export default storage;
