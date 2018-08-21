import logger from './logger';
import * as seed from '../../seed';

class LocalStorage {
  static mainKey = 'cloud-batch';
  data = {};

  constructor() {
    // this.load();
    this.seed();
  }

  seed() {
    this.data = {
      '/api/batch/DeviceManager/plant/3': seed.devices
    };
  }

  load() {
    try {
      this.data = JSON.parse(window.localStorage.getItem(this.mainKey)) || {};
    } catch (e) {
      logger.error(e);
      logger.warn('There was problem loading data from local storage');
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
