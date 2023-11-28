export function formatNumber(digit: number) {
  return new Intl.NumberFormat("en-US").format(digit);
}
