// NOTE all models consists of id, deviceTypeName, description by default

export const Aerator = {
  switchPNo: 'number'
};

export const Belt = {
  beltStart: 'beltStart',
  beltOnPNo: 'number',
  beltOffPNo: 'number',
  description: 'text'
};

export const Bin = {
  aeratorId: 'number',
  scaleId: 'number',
  gateOnePNo: 'number',
  gateTwoPNo: 'number',
  gateCloseStatusPNo: 'number',
  materialLowAlarmPNo: 'number',
  lowAlarmType: 'lowAlarmType',
  lowAlarmDuration: 'number',
  materialOverAlarmPNo: 'number',
  overAlarmType: 'overAlarmType',
  overAlarmPNo: 'number',
  screwId: 'number',
  moistureTesterId: 'number'
};

export const Boot = {
  bootUpPNo: 'number',
  bootDownPNo: 'number'
};

export const Bottle = {
  gatePNo: 'number',
  emptyStatusPNo: 'number'
};

export const DustCollector = {
  switchPNo: 'number'
};

export const Hoist = {
  hoistUpPNo: 'number',
  hoistDownPNo: 'number',
  upStatusPNo: 'number',
  downStatusPNo: 'number',
  emptyStastusPNo: 'number',
  enableStastusPNo: 'number',
  openGateDuration: 'number',
  closeGateDuration: 'number'
};

export const Horn = {
  switchPNo: 'number',
  delayOne: 'number',
  delayOneDuration: 'number',
  delayTwo: 'number',
  delayTwoDuration: 'number',
  delayThree: 'number',
  delayThreeDuration: 'number'
};

export const ManualPanel = {
  startBatchEnablePNo: 'number',
  startDischEnablePNo: 'number',
  plantErrorPNo: 'number',
  batchResetPNo: 'number',
  startDischPNo: 'number'
};

export const Mixer = {
  openTiltPNo: 'number',
  closeReturnPNo: 'number',
  openTiltStatusPNo: 'number',
  closeReturnStatusPNo: 'number',
  autoTiltStatusPNo: 'number',
  tWaterMeterStatusPNo: 'number',
  switchStatusPNo: 'number',
  hopperLStatusPNo: 'number',
  readyStatusPNo: 'number',
  dischreadyLightPNo: 'number',
  moistureTesterId: 'number',
  mixerType: 'mixerType',
  openGatePNo: 'number',
  aggChargeType: 'number',
  preMixingTime: 'number',
  mixingTime: 'number',
  finalMixingTime: 'number',
  topOpenTime: 'number',
  drownCloseDelay: 'number',
  maximumMixingTime: 'number',
  chargingRate: 'number',
  dischargeSequence: 'dischargeSequence'
};

export const MoistureTester = {
  scaleId: 'number',
  zeroOffset: 'number', // double
  calibration: 'number' // double
};

export const Pump = {
  bottleId: 'number',
  tankId: 'number',
  gatePNo: 'number',
  meterPNo: 'number'
};

export const RemoteDisplay = {
  address: 'number',
  portCOM: 'number',
  baudRate: 'baudRate',
  dataBits: 'number',
  stopBits: 'number', // double
  parity: 'parity',
  streaminterval: 'number',
  promptSwitchinterval: 'number',
  displayMode: 'displayMode',
  promptOne: 'text',
  promptTwo: 'text',
  weight: 'text',
  discharge: 'text',
  idle: 'text'
};

export const Scale = {
  vibratorId: 'number',
  aeratorId: 'number',
  beltId: 'number',
  screwId: 'number',
  openGateOnePNo: 'number',
  closeGateOnePNo: 'number',
  gateOneStatusPNo: 'number',
  closeTimerPNo: 'number',
  beltScalePNo: 'number',
  remoteDisplayId: 'number',
  decumulative: 'boolean',
  notHoldClose: 'boolean',
  openGateTwoPNo: 'number',
  closeGateTwoPNo: 'number',
  gateTwoStatusPNo: 'number',
  name: 'text',
  unit: 'unit',
  capacity: 'number',
  maximumLoad: 'number',
  graduation: 'number',
  motionWidth: 'number',
  startTare: 'number',
  dischargeTare: 'number',
  settingTime: 'number',
  dischargeCloseDelay: 'number',
  dischargeCloseType: 'dischargeCloseType',
  adjustTolerance: 'number',
  flowRateAvarage: 'number',
  dischargeOpen: 'number',
  vibrationOn: 'number',
  openDuration: 'number', // double
  fullOpen: 'number',
  closeDuration: 'number', // double
  metricGraduation: 'number',
  metricUnit: 'number', // double
  metricStartTare: 'number',
  metricDischargeTare: 'number',
  calibration: 'number', // double
  zeroOffset: 'number' // double
};

export const Screw = {
  screwType: 'screwType',
  switchOnePNo: 'number',
  switchTwoPNo: 'number',
  switchOffPNo: 'number'
};

export const Switch = {
  switchOnPNo: 'number',
  switchOffPNo: 'number',
  switchStatusPNo: 'number',
  switchOnLabel: 'text',
  switchOffLabel: 'text',
  offTrigerStatusPNo: 'number'
};

export const Tank = {
  gatePNo: 'number',
  closeStatusPNo: 'number',
  emptyStatusPNo: 'number'
};

export const Vibrator = {
  switchOnePNo: 'number',
  switchTwoPNo: 'number'
};
