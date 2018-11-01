export const ScheduleModel = {
  localJobCode: { type: 'text', col: 3 },
  ticketCode: { type: 'text', col: 3 },
  account: { type: 'text', col: 3 },
  accountType: {
    col: 3,
    type: 'accountType',
    options: [{ value: 'OPEN', text: 'OPEN' }, { value: 'COD', text: 'COD' }]
  },
  shipDate: { type: 'date', col: 2 },
  loadTime: { type: 'time', col: 2 },
  po: { placeholder: 'PO#', type: 'number', col: 2 },
  usage: { type: 'text', col: 2 },
  slump: { type: 'text', col: 2 },
  tax: { placeholder: 'Tax %', type: 'number', col: 2 },
  truck: { type: 'text', col: 3 },
  quantityInTruck: { type: 'number', col: 3 },
  quantityOrdered: { type: 'number', col: 3 },
  quantityToday: { type: 'number', col: 3 },
  notes: { type: 'text', col: 12 }
};

export const MixModel = {
  code: { type: 'text', col: 1 },
  description: { type: 'text', col: 3 },
  unit: { type: 'text', col: 1 },
  quantity: { type: 'number', col: 2 },
  price: { type: 'number', col: 2 },
  amount: { type: 'number', col: 2 },
  taxable: { label: 'Tax?', type: 'boolean', col: 1 }
};
