import fetch from 'node-fetch';
import parseCityList from './parse-city-list';
import getRedisClient from '../../db/get-redis-client';

const cacheKey = 'gumtree_cities';
const desktopUserAgent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36';

export default async function getCityList(): Promise<Object> {
  const cacheClient = await getRedisClient();
  const cachedResult = await cacheClient.getAsync(cacheKey);

  let result: Object;

  if (cachedResult) {
    result = JSON.parse(cachedResult);
  } else {
    try {
      const response = await fetch('https://www.gumtree.pl', {
        headers: { 'User-Agent': desktopUserAgent }
      });
      
      const responseText = await response.text();
      const cities = parseCityList(responseText);

      cacheClient.set(cacheKey, JSON.stringify(cities));
      cacheClient.expire(cacheKey, 60*60*24);
    } catch (e) {
      console.error(e);
    }
  }

  cacheClient.quit();

  return result;
}