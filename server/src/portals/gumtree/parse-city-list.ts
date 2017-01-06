// TODO: Masovian voivodeship needs additional handling to fetch the list of all cities
export default function parseCityList(html: string): Object {
  const cities = {};

  const contentAfterSecondScriptTextPlainTag = html.split('<script type="text/plain">')[2];
  const citiesAsJson = contentAfterSecondScriptTextPlainTag.split('</script>')[0];
  const citiesByVoivodeship = JSON.parse(citiesAsJson);

  citiesByVoivodeship.children.forEach(voivodeship => {
    voivodeship.children.forEach(city => {
      cities[city.id] = city.localizedName;
    });
  });

  return cities;
}
