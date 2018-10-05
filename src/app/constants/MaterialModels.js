export const WeighedMaterialModel = {
  autoCutOff: 'boolean', // free fall table
  firstCutOff: 'number',
  freeFall: 'number',
  smallFreefall: 'number',
  autoJog: 'boolean', // jog table
  jogOpenTime: 'number',
  jogCloseTime: 'number',
  smallJogOpen: 'number',
  moistureAmount: 'number',
  dischargeOpen: 'number',
  openDuration: 'number',
  weighedMaterialType: 'weighedMaterialType',
  toleranceAmountType: 'number', //toleranceAmountType TODO
  scaleSettingTime: 'number',
  absorbtion: 'number',
  aerationOff: 'number',
  closeDuration: 'number',
  batchOrder: 'number',
  primaryBinId: 'number',
  autoMoisture: 'boolean',
  autoMoistureAmount: 'number',
  autoMoistureDelay: 'number',
  autoMoistureMinWeight: 'number',
  autoMoistureMinAmount: 'number',
  autoMoistureMaxAmount: 'number',
  inventoryItemId: 'number',
  binId: 'number',
  pumpId: 'number',
  tolerance: 'number',
  minFlowRate: 'number',
  batchMode: 'batchMode',
  showBalance: 'boolean',
  verification: 'boolean',
  verificationMessage: 'text',
  turboBatch: 'boolean',
  maxAmountInMix: 'number',
  inventoryUnitId: 'number',
  specificGravity: 'number',
  activity: 'number',
  alarmLevel: 'number',
  alarmOn: 'boolean',
  alias: 'text'
};

export const MeteredMaterialModel = {
  cutOff: 'number',
  batchStartId: 'number',
  batchDelay: 'number',
  dischargeStartId: 'number',
  dischargeDelay: 'number',
  lineClearTime: 'number',
  bottle: 'boolean',
  batchPercent: 'number',
  waterPercent: 'number',
  interfaceUnit: 'text',
  meteredMaterialType: 'meteredMaterialType',
  meterRate: 'number',
  batchUnitId: 'number',
  autoGravity: 'number',
  gravityMeterDelay: 'number',
  metricBatchUnitId: 'number',
  percentInMixDesign: 'number',
  dropProportion: 'text',
  inventoryItemId: 'number',
  binId: 'number',
  pumpId: 'number',
  tolerance: 'number',
  minFlowRate: 'number',
  batchMode: 'batchMode',
  showBalance: 'boolean',
  verification: 'boolean',
  verificationMessage: 'text',
  turboBatch: 'boolean',
  maxAmountInMix: 'number',
  inventoryUnitId: 'number',
  specificGravity: 'number',
  activity: 'number',
  alarmLevel: 'number',
  alarmOn: 'boolean',
  alias: 'text'
};

export const UnassignedMaterialModel = {
  assignment: 'assignment'
};

export default {
  Weighed: WeighedMaterialModel,
  Metered: MeteredMaterialModel,
  None: UnassignedMaterialModel
};
