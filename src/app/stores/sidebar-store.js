import { observable } from 'mobx';

class SidebarStore {
  @observable
  type = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // actions
  onToggle = item => {
    this.type = item;
  };
}

export default SidebarStore;
