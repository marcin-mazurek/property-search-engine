import Property from '../../../core/src/property';
import { resultsPerPage } from '../config';

export default function paginateResult(properties: Property[], page: number): Property[] {
  return properties.slice((page - 1) * resultsPerPage, page * resultsPerPage);
}