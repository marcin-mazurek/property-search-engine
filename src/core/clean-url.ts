export default function cleanUrl(url: string): string {
  return url.replace('www.', '').split('#')[0];
}