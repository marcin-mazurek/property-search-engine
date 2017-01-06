import 'mocha';
import { expect } from 'chai';
import gumtreeHomePageHtml from '../../_fixtures/gumtree-home-page';
import parseCityList from '../../../src/portals/gumtree/parse-city-list';

describe('parseCityList()', () => {
  it('parses cities list from Gumtree.pl home page', () => {
    const cities = parseCityList(gumtreeHomePageHtml);

    expect(Object.keys(cities)).to.have.lengthOf(10);

    expect(cities[3200580]).to.equal('Witkowo');
    expect(cities[3200376]).to.equal('Wolsztyn');
    expect(cities[3200581]).to.equal('Wronki');
    expect(cities[3200377]).to.equal('Września');
    expect(cities[3200378]).to.equal('Złotów');
    expect(cities[3200405]).to.equal('Świnoujście');
    expect(cities[3200583]).to.equal('Trzebiatów');
    expect(cities[3200406]).to.equal('Wałcz');
    expect(cities[3200584]).to.equal('Wolin');
    expect(cities[3200585]).to.equal('Złocieniec');
  });
});