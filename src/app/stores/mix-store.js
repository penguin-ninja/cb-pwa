import { observable, action, computed } from 'mobx';

class MixStore {
  @observable
  mixes = [
    {
      id: 1,
      code: 'E2500',
      description: 'Commercial P-52'
    },
    {
      id: 2,
      code: 'E3000',
      description: 'Commercial 3000 PSI'
    }
  ];
  @observable
  mixMaterials = [];
  @observable
  mixParameters = [];
  @observable
  loading = false;
  @observable
  saving = false;
  @observable
  checked = new Map();
  @observable
  selectedId = null; // indicates last selected row

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  get api() {
    return this.rootStore.authStore;
  }

  get plantId() {
    return this.rootStore.authStore.plantId;
  }

  getMixById = id => this.mixes.find(s => s.id === id);

  @action
  changeMix = (id, fieldName, value) => {
    const mix = this.getMixById(id);
    mix[fieldName] = value;
  };

  @action
  toggleCheck = id => {
    const checked = this.checked.get(id);
    this.checked.set(id, !checked);
    this.selectedId = id;
  };

  @action
  checkAll = () => {
    this.mixes.forEach(m => {
      this.checked.set(m.id, true);
    });
  };

  @action
  uncheckAll = () => {
    this.mixes.forEach(m => {
      this.checked.set(m.id, false);
    });
  };
}

export default MixStore;
