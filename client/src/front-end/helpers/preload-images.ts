function preloadImage(source: string) {
  return new Promise(resolve => {
    const image = new Image();
    image.src = source;
    image.onload = resolve;
  });
}

export default function preloadImages(sources: string[]) {
  const promises = sources.map(preloadImage);
  console.log(sources);
  return Promise.all(promises);
}