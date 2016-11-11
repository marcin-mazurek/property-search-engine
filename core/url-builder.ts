export default class URLBuilder {
  private url: string;
  private queryStringParts: string[] = [];

  constructor(host: string) {
    this.url = host;
  }

  addSegment(segment: string) : void {
    this.url += '/' + segment;
  }

  addQueryStringPart(key: string, value: string) : void {
    this.queryStringParts.push(key + '=' + value);
  }

  build() : string {
    if (this.queryStringParts.length) {
      return this.url + '?' + this.queryStringParts.join('&');
    }
    else {
      return this.url;
    }
  }
}