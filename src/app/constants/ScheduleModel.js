export const ScheduleModel = {
  localJobCode: { type: 'text', col: 3 }, // ticketCode
  ticketCode: { type: 'text', col: 3 },  // ticketCode
  account: { type: 'text', col: 3 }, // customerCode
  accountType: {
    col: 3,
    type: 'accountType',
    options: [{ value: 0, text: 'OPEN' }, { value: 1, text: 'COD' }]
  }, // accountType
  shipDate: { type: 'date', col: 2 }, // shipDate
  loadTime: { type: 'time', col: 2 }, // shipDate
  po: { placeholder: 'PO#', type: 'number', col: 2 }, // purchaseOrderNumber
  usage: { type: 'text', col: 2 }, // usageCode
  slump: { type: 'text', col: 2 }, // product.productSlump
  tax: { placeholder: 'Tax %', type: 'number', col: 2 }, // product.productTax
  truck: { type: 'text', col: 3 }, // truckCode
  quantityInTruck: { type: 'number', col: 3 }, // product.productQuantityInTruck
  quantityOrdered: { type: 'number', col: 3 }, // product.productTotalQuantityOrdered
  quantityToday: { type: 'number', col: 3 }, // product.productTotalQuantityToday
  notes: { type: 'text', col: 12 }
};

export const MixModel = {
  code: { type: 'text', col: 1 }, // product.productItemCode
  description: { type: 'text', col: 3 }, // product.productItemDescription
  unit: { type: 'text', col: 1 }, // product.productUnitCode
  quantity: { type: 'number', col: 2 }, // product.productQuantity
  price: { type: 'number', col: 2 }, // product.productQuantityPrice
  amount: { type: 'number', col: 2 }, // product.productQuantity * productQuantityPrice - productTax
  taxable: { label: 'Tax?', type: 'boolean', col: 1 } // product.taxable
};
