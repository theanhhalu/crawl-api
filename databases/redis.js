const redis = require('redis');
const { promisify } = require('util');

const REDIS_URL = process.env.REDIS_URL || null;

const redisClient = redis.createClient({url: REDIS_URL});

redisClient.on('connect', () => console.log('Redis connected!'));
redisClient.on('error', (err) => console.log(err));
redisClient.on('end', () => console.log('Redis disconnected'));

exports.get = promisify(redisClient.get).bind(redisClient);
exports.setex = promisify(redisClient.setex).bind(redisClient);
exports.keys = promisify(redisClient.keys).bind(redisClient);