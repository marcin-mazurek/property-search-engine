import { Request, Response } from 'express';
import Filters from '../../../../core/src/filters';
import buildFilters from './build-filters';
import search from '../../search/search';

export default async function searchHandler(request: Request, response: Response) {
  let filters: Filters;

  try {
    filters = buildFilters(request.query);
  } catch (e) {
    response.status(500).json({ error: e.message });
  }

  const page = Number(request.query['page'] || 1);

  try {
    const result = await search(filters, page);
    response.json(result);
  } catch (e) {
    response.status(500).json({ exception: e.message });
  }
}