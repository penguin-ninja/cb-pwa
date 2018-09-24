import { observable, action } from 'mobx';
import { POLLING_DIAGNOSE_INTERVAL, OUTPUT_TTL } from 'app/constants/Pac';

class DiagnoseStore {
  @observable
  showModal = false;
  @observable
  inputs = Array(48).fill('0'); // e.g
  @observable
  outputs = Array(96).fill('0');
  @observable
  channels = Array(16).fill('0');
  @observable
  isTesting = false;
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
      console.log(result);
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

  startPollingStatus = () => {
    this.getStatusInterval = setInterval(
      this.loadStatus,
      POLLING_DIAGNOSE_INTERVAL
    );
  };

  stopPollingStatus = () => {
    clearInterval(this.getStatusInterval);
  };

  @action
  setOutput = (port, value = '1') => {
    this.pac
      .run(`set-output ${port}=${value === '1' ? OUTPUT_TTL : value}`)
      .then(() => {
        this.outputs[port - 1] = value;
      });
  };

  @action
  setAllOutputs = value => {
    const params = Array(96)
      .fill(value)
      .map((v, key) => `${key + 1}=${v === '1' ? OUTPUT_TTL : v}`)
      .join(' ');
    this.pac.run(`set-outputs ${params}`).then(() => {
      this.outputs = this.outputs.map(() => value);
    });
  };

  @action
  startOutputTest = () => {
    let port = 0;
    this.isTesting = true;
    this.testingOutputInterval = setInterval(() => {
      port += 1;
      if (port > 96) {
        this.stopOutputTest();
        return;
      }

      this.setOutput(port, this.outputs[port - 1] === '1' ? '0' : '1');
    }, 1000);
  };

  @action
  stopOutputTest = () => {
    this.isTesting = false;
    clearInterval(this.testingOutputInterval);
  };

  @action
  onShow = () => {
    this.showModal = true;
    this.loadStatus();
    this.startPollingStatus();
  };

  @action
  onHide = () => {
    this.showModal = false;
    this.stopPollingStatus();
    this.stopOutputTest();
  };
}

export default DiagnoseStore;
