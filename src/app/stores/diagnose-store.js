import { observable, action } from 'mobx';

class DiagnoseStore {
  @observable
  showModal = false;

  @action
  onShow = () => {
    this.showModal = true;
  };

  @action
  onHide = () => {
    this.showModal = false;
  };
}

export default DiagnoseStore;
