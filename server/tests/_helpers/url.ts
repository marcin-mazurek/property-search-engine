export function getQueryStringFromUrl(url): string[] {
  return url.split('?')[1].split('&');
}

export function getURLSegments(url): string[] {
  return url.split('?')[0].split('/').slice(3);
}