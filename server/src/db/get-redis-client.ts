import redis from './redis';

export default function getRedisClient(): Promise<any> {
  const client = redis.createClient(process.env.REDIS_URL);

  return new Promise((resolve, reject) => {
    client.on('connect', () => resolve(client));
    client.on('error', reject);
  });
};