import { observable } from 'mobx';

class SidebarStore {
  @observable show = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // actions
  onToggle = () => {
    this.show = !this.show;
  }
}

export default SidebarStore;
