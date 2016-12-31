import Filters from '../../../core/src/filters';
const md5 = require('md5');

export default function buildCacheKey(filters: Filters) {
  return 'search_result:' + md5(JSON.stringify(filters));
}