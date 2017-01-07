export default function parseListingPrice(price: string): number {
  const unformattedPrice = price
    .replace('zł', '')
    .replace(new RegExp(' ', 'g'), '')
    .replace(new RegExp("\u00A0", 'g'), '');
  return parseInt(unformattedPrice);
}