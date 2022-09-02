export const formatCurrency = (value: number) =>
  `Rp${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
