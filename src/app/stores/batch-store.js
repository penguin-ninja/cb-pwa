import { observable, action } from 'mobx';
import { POLLING_INTERVAL, OUTPUT_TTL } from 'app/constants/Pac';

class BatchStore {
  @observable
  showModal = false;
  @observable
  inputs = Array(48).fill('0'); // e.g
  @observable
  outputs = Array(96).fill('0');
  @observable
  channels = Array(16).fill('0');
  @observable
  isRunning = false;
  @observable
  ticks = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  get pac() {
    return this.rootStore.pacStore;
  }

  @action
  loadStatus = () => {
    return this.pac.run('get-status').then(result => {
      this.ticks = result.ticks;
      this.inputs = result.inputs
        .replace(/\./g, '')
        .trim()
        .split('');
      this.outputs = result.outputs
        .replace(/\./g, '')
        .trim()
        .split('');
      const weights = result.weights.trim().split(' ');
      weights.shift(); // shifting first 16 leading zeros

      this.channels = weights;
    });
  };

  start = () => {
    this.isRunning = true;
    this.getStatusInterval = setInterval(this.loadStatus, POLLING_INTERVAL);
  };

  stop = () => {
    this.isRunning = false;
    clearInterval(this.getStatusInterval);
  };

  @action
  setOutput = (port, value = '1') => {
    return this.pac.run(
      `set-output ${port}=${value === '1' ? OUTPUT_TTL : value}`
    );
  };
}

export default BatchStore;
