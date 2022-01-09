const GST = 0.8;

const calculateTax  = (subTotal) => {
  return subTotal * GST;
}

export const calculateBill = (items) => {
  let total = 0;

  for (let i = 0; i < items.length; i += 1) {
    total += items[i];
  }
  total += calculateTax(total); // helper function used internally, dont need to be exported

  return total;
}
