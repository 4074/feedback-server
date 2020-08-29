const isPm2 = process.env.PM2 === '1'
const isProduction = process.env.ENV === 'PRODUCTION'

export default {
  port: 4000,
  receivePort: 4040,
  isPm2,
  isProduction,

  database: 'mongodb',
  mongodb: 'mongodb://localhost:27017/feedback',

  storage: 'aws'
}
