export default function parseThumbnailCSS(thumbnailImageCss: string): string {
  return thumbnailImageCss.replace('background-image:url(', '').replace(')', '');
}