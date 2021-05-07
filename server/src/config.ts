import dotenv from 'dotenv'

dotenv.config()
const { env } = process

const isPm2 = env.PM2 === '1'
const isProduction = env.ENV === 'PRODUCTION'

export default {
  root: __dirname,
  port: env.PORT || 4000,
  host: env.HOST || 'http://localhost:4000',
  publicHost: env.RECEIVE_HOST || 'http://localhost:4040',
  publicPort: env.RECEIVE_PORT || 4040,
  isPm2,
  isProduction,

  database: env.DATABASE || 'mongodb',
  mongodb: env.MONGODB || 'mongodb://localhost:27017/feedback',

  storage: env.STORAGE || 'file',
  aws: {
    key: env.AWS_KEY,
    secret: env.AWS_SECRET,
    bucket: env.AWS_BUCKET,
    endpoint: env.AWS_ENDPOINT
  },

  password: env.PASSWORD || '123456',

  popo: {
    account: env.POPO_ACCOUNT || '',
    token: env.POPO_TOKEN || ''
  }
}
