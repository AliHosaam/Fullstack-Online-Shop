export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("eu-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
