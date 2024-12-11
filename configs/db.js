const { Redis } = require("ioredis");
const redis = new Redis(process.env.REDIS_URI);

async function connectToDB() {
  try {
    await redis.ping(() =>
      console.log("Connected To Redis Database Successfully")
    );
  } catch (error) {
    console.log(error);
    redis.disconnect();
    process.exit(1);
  }
}

module.exports = {
  redis,
  connectToDB,
};
