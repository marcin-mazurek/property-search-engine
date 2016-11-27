import { Request, Response } from 'express';
import Filters from '../../../../core/src/filters';
import fetchListing from '../../../../server/src/portals/olx/fetch-listing';
import buildFilters from './build-filters';

export default async function searchHandler(request: Request, response: Response) {
  let filters: Filters;

  try {
    filters = buildFilters(request.query);
  } catch (e) {
    response.status(500).json({ error: e.message });
  }

  const page = Number(request.query['page'] || 1);

  try {
    const properties = await fetchListing(filters, page);
    response.json(properties);
  } catch (e) {
    response.status(500).json({ exception: e });
  }
}