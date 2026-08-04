const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://host.docker.internal:6379"
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    console.log("Redis Connected Successfully - Inventory Service");
  } catch (error) {
    console.error("Redis Connection Failed:", error.message);
  }
};

module.exports = {
  redisClient,
  connectRedis
};