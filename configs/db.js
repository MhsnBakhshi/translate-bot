const { PrismaClient } = require("@prisma/client");
const { Redis } = require("ioredis");

const redis = new Redis(process.env.REDIS_URI);
const prisma = new PrismaClient();

async function connectToDB() {
  try {
    await prisma.$connect();
    console.log("Connected To Database Successfully!");

    await redis.ping(() =>
      console.log("Connected To Redis Database Successfully")
    );
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    redis.disconnect();
    process.exit(1);
  }
}

module.exports = {
  redis,
  prisma,
  connectToDB,
};
