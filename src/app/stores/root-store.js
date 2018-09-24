import AuthStore from './auth-store';
import SidebarStore from './sidebar-store';
import DevicesStore from './devices-store';
import DiagnoseStore from './diagnose-store';
import BatchStore from './batch-store';
import PacStore from './pac-store';

class RootStore {
  constructor() {
    this.createStores();
  }

  createStores() {
    this.authStore = new AuthStore(this);
    this.sidebarStore = new SidebarStore(this);
    this.devicesStore = new DevicesStore(this);
    this.pacStore = new PacStore(this);
    this.diagnoseStore = new DiagnoseStore(this);
    this.batchStore = new BatchStore(this);
  }
}

export default RootStore;
