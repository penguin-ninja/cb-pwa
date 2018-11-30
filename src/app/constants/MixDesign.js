export const SYNC_DELAY = 5 * 60 * 1000; // 5 mins

export const MIX_PARAMETERS = [
  { id: 'unit', name: 'Unit', defaultValue: 'YD' },
  { id: 'localPrice', name: 'Local Price', defaultValue: '0.00' },
  { id: 'tax', name: 'Tax', defaultValue: 'N' },
  { id: 'maxDropsize', name: 'Max Dropsize', defaultValue: '0.00' },
  { id: 'mixingTime', name: 'Mixing Time (mins)', defaultValue: '0' },
  { id: 'slump', name: 'Slump', defaultValue: '4.00' },
  { id: 'slumpTable', name: 'Slump Table', defaultValue: 'SLUMP 1' },
  {
    id: 'controllingWcRatio',
    name: 'Controlling W/C Ratio',
    defaultValue: '0.00'
  },
  { id: 'airVolumePercent', name: 'Air Volume (%)', defaultValue: '0.00' },
  { id: 'extensionUnit', name: 'Extension Unit', defaultValue: 'Per Load' }
];
