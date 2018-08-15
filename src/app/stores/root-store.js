import SidebarStore from './sidebar-store';

class RootStore {
  constructor() {
    this.createStores();
  }

  createStores() {
    this.sidebarStore = new SidebarStore(this);
  }
}

export default RootStore;
