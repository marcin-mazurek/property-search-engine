export default function parseCityList(html: string): Map<number, string> {
  const cities = new Map();

  const contentAfterSecondScriptTextPlainTag = html.split('<script type="text/plain">')[2];
  const citiesAsJson = contentAfterSecondScriptTextPlainTag.split('</script>')[0];
  const citiesByVoivodeship = JSON.parse(citiesAsJson);

  citiesByVoivodeship.children.forEach(voivodeship => {
    voivodeship.children.forEach(city => {
      cities.set(city.id, city.localizedName);
    });
  });

  return cities;
}
