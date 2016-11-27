export default function parseListingPrice(price: string): number {
  const unformattedPrice = price.replace('zł', '').split(' ').join('');
  return parseInt(unformattedPrice);
}