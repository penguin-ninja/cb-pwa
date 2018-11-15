import { observable, action, computed } from 'mobx';
import shortid from 'shortid';
import debounce from 'lodash/debounce';
import storage from 'app/utils/local-storage';
import { SYNC_DELAY, MIX_PARAMETERS } from 'app/constants/MixDesign';

class MixStore {
  @observable
  mixes = [];
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

  // sync
  @observable
  isDirty = false;
  @observable
  isSynced = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.debouncedSaveOffline = debounce(this.saveOffline, 1000);
  }

  get api() {
    return this.rootStore.authStore;
  }

  get plantId() {
    return this.rootStore.authStore.plantId;
  }

  getMixById = id => this.mixes.find(s => s.id === id);

  getCurrentMixParameters = () => {
    if (this.selectedId) {
      return computed(() =>
        this.mixParameters.filter(m => m.mixId === this.selectedId)
      ).get();
    }

    return computed(() => []).get();
  };

  getCurrentMixMaterials = () => {
    if (this.selectedId) {
      return computed(() =>
        this.mixMaterials.filter(m => m.mixId === this.selectedId)
      ).get();
    }

    return computed(() => []).get();
  };

  /////////////////////
  // UPDATE RELATED //
  ////////////////////

  @action
  changeMix = (id, fieldName, value) => {
    const mix = this.getMixById(id);
    mix[fieldName] = value;
    this.debouncedSaveOffline();
  };

  @action
  changeParameter = (mixId, id, value) => {
    const param = this.mixParameters.find(
      s => s.id === id && s.mixId === mixId
    );
    param.value = value;
    this.debouncedSaveOffline();
  };

  @action
  addMix = () => {
    const id = shortid.generate();
    this.mixes.push({
      id,
      code: '',
      description: ''
    });
    this.mixParameters.push(...this.generateMixParams(id));
    this.debouncedSaveOffline();
  };

  @action
  deleteMix = id => {
    this.mixes = this.mixes.filter(m => m.id !== id);
    this.mixParameters = this.mixParameters.filter(m => m.mixId !== id);
    this.mixMaterials = this.mixMaterials.filter(m => m.mixId !== id);
    this.checked.set(id, false);
    this.debouncedSaveOffline();
  };

  @action
  cloneMixes = items => {
    items.forEach(item => {
      const mix = this.mixes.find(m => m.id === item.mixId);
      const materials = this.mixMaterials.filter(m => m.mixId === item.mixId);
      const parameters = this.mixParameters.filter(m => m.mixId === item.mixId);
      const newId = shortid.generate();

      this.mixes.push({
        id: newId,
        code: item.code,
        description: mix.description
      });
      materials.forEach(m => {
        this.mixMaterials.push({
          ...m,
          mixId: newId
        });
      });
      parameters.forEach(m => {
        this.mixParameters.push({
          ...m,
          mixId: newId
        });
      });
    });
  };

  //////////////////////
  // MATERIAL RELATED //
  //////////////////////

  @action
  addMaterials = items => {
    this.checkedIDs.forEach(id => {
      items.forEach(item => {
        const exists = this.mixMaterials.find(
          m => m.mixId === id && m.materialId === item.materialId
        );

        if (!exists) {
          this.mixMaterials.push({
            ...item,
            mixId: id
          });
        }
      });
    });
    this.debouncedSaveOffline();
  };

  @action
  changeMaterials = items => {
    this.checkedIDs.forEach(id => {
      items.forEach(item => {
        const material = this.mixMaterials.find(m => {
          return m.mixId === id && m.materialId === item.oldMaterialId;
        });

        if (material) {
          material.materialId = item.newMaterialId;
        }
      });
    });
    this.debouncedSaveOffline();
  };

  @action
  adjustMaterials = items => {
    this.checkedIDs.forEach(id => {
      items.forEach(item => {
        const material = this.mixMaterials.find(m => {
          return m.mixId === id && m.materialId === item.materialId;
        });

        if (material) {
          if (item.byPercent) {
            material.amount =
              Number(material.amount) +
              Math.round((material.amount * item.amount) / 100);
          } else {
            material.amount = Number(material.amount) + Number(item.amount);
          }
        }
      });
    });
    this.debouncedSaveOffline();
  };

  @action
  removeMaterials = items => {
    this.checkedIDs.forEach(id => {
      items.forEach(item => {
        this.mixMaterials = this.mixMaterials.filter(m => {
          return m.mixId !== id || m.materialId !== item.materialId;
        });
      });
    });
    this.debouncedSaveOffline();
  };

  @action
  print = () => {};

  /////////////////////
  // OFFLINE RELATED //
  /////////////////////

  @action
  startSync = () => {
    this.syncTimer = setInterval(this.sync, SYNC_DELAY);
  };

  @action
  stopSync = () => {
    clearInterval(this.syncTimer);
  };

  @action
  saveOffline = () => {
    this.isDirty = true;
    this.isSynced = false;

    storage.setItem('mixes', this.mixes.toJS());
    storage.setItem('mixDirty', this.isDirty);
    storage.setItem('mixSynced', this.isSynced);
    storage.setItem('mixMaterials', this.mixMaterials.toJS());
    storage.setItem('mixParameters', this.mixParameters.toJS());
  };

  @action
  sync = () => {
    // @TODO sync data with online
    if (this.isDirty) {
      // @TODO push data to cloud
    } else {
      // @TODO load data from cloud
    }
  };

  @action
  load = () => {
    // @TODO load data initially from remote
    this.mixes = storage.getItem('mixes') || [];
    this.isDirty = storage.getItem('mixDirty') || false;
    this.isSynced = storage.getItem('mixSynced') || false;
    this.mixMaterials = storage.getItem('mixMaterials') || [];
    this.mixParameters = storage.getItem('mixParameters') || [];
  };

  generateMixParams(mixId) {
    return MIX_PARAMETERS.map(p => ({
      ...p,
      mixId,
      value: p.defaultValue
    }));
  }

  ////////////////////
  // TOGGLE RELATED //
  ////////////////////

  @computed
  get checkedSize() {
    let size = 0;
    this.checked.forEach(v => {
      if (v) size++;
    });
    return size;
  }

  @computed
  get checkedIDs() {
    const arr = [];
    this.checked.forEach((v, id) => {
      if (v) arr.push(id);
    });
    return arr;
  }

  @action
  selectMix = id => {
    this.selectedId = id;
  };

  @action
  toggleCheck = id => {
    const checked = this.checked.get(id);
    this.checked.set(id, !checked);
  };

  @action
  toggleAll = () => {
    this.mixes.forEach(m => {
      this.checked.set(m.id, !this.checked.get(m.id));
    });
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
