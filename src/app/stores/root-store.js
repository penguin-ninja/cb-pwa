import AuthStore from './auth-store';
import SidebarStore from './sidebar-store';
import DevicesStore from './devices-store';
import DiagnoseStore from './diagnose-store';
import BatchStore from './batch-store';
import PacStore from './pac-store';
import MaterialStore from './material-store';
import JogStore from './jog-store';
import CutoffStore from './cutoff-store';
import ShipHistoryStore from './ship-history-store';
import ScheduleStore from './schedule-store';

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
    this.materialStore = new MaterialStore(this);
    this.jogStore = new JogStore(this);
    this.cutoffStore = new CutoffStore(this);
    this.shipHistoryStore = new ShipHistoryStore(this);
    this.scheduleStore = new ScheduleStore(this);
  }
}

export default RootStore;
