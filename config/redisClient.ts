import { createClient } from 'redis'

const redisClient = createClient({
  url: process.env.REDIS_URI,
  socket: {
    reconnectStrategy: (retries = 3) => {
      if (retries < 10) {
        return Math.min(retries * 1000, 3000);
      }
      return false;
    }
  }
});

const connectRedis = async () => {
  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
      console.log('Connected to Redis');
    } catch (err) {
      console.error('Redis connection error:', err);
    }
  }
};

async function closeRedisClient() {
  if (redisClient) {
    await redisClient.quit();
  }
}

redisClient.on('error', (err: any) => {
  console.error('Redis error:', err);
});

redisClient.on('reconnecting', () => {
  console.log('Reconnecting to Redis...');
});

redisClient.on('connect', () => {
  console.log('Reconnected to Redis');
});


export { redisClient, connectRedis, closeRedisClient };
