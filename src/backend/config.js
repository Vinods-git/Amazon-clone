// eslint-disable-next-line import/no-anonymous-default-export
export default {
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/amazon',
  JWT_SECRET: process.env.JWT_SECRET || 'SOMETHINGSECRET',
};
