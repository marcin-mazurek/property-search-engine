import Filters, { Category, Market, Type } from '../../core/filters';
import fetchListing from '../../server/portals/olx/fetch-listing';
import schema from './prompt-schema';
import renderTable from './render-table';

const consolePrompt = require('prompt');

export default function runSearch() {
  consolePrompt.start();
  consolePrompt.get(schema, (error, result) => {
    const filters: Filters = {
      category: result.category,
      type: result.type,
      market: result.market,
      location: result.location,
      priceFrom: Number(result.priceFrom),
      priceTo: Number(result.priceTo),
      areaFrom: Number(result.areaFrom),
      areaTo: Number(result.areaTo)
    };

    const properties = fetchListing(filters)
      .then(renderTable)
      .catch(console.error);
  });
}