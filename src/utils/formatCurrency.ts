export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const calculateDiscountPrice = (price: number, discount?: number): number => {
  if (!discount) return price;
  return price * (1 - discount / 100);
};