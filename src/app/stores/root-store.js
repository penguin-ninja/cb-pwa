import AuthStore from './auth-store';
import SidebarStore from './sidebar-store';
import DevicesStore from './devices-store';
import DiagnoseStore from './diagnose-store';

class RootStore {
  constructor() {
    this.createStores();
  }

  createStores() {
    this.authStore = new AuthStore(this);
    this.sidebarStore = new SidebarStore(this);
    this.devicesStore = new DevicesStore(this);
    this.diagnoseStore = new DiagnoseStore(this);
  }
}

export default RootStore;
