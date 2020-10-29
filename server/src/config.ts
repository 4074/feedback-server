import dotenv from 'dotenv'

dotenv.config()
const { env } = process

const isPm2 = env.PM2 === '1'
const isProduction = env.ENV === 'PRODUCTION'

export default {
  port: env.PORT || 4000,
  publicPort: env.RECEIVE_PORT || 4040,
  isPm2,
  isProduction,

  database: 'mongodb',
  mongodb: env.MONGODB || 'mongodb://localhost:27017',

  storage: 'aws',
  aws: {
    key: env.AWS_KEY,
    secret: env.AWS_SECRET,
    bucket: env.AWS_BUCKET,
    endpoint: env.AWS_ENDPOINT
  }
}
