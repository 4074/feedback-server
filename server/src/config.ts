const isProduction = process.env.ENV === 'PRODUCTION'

export default {
  port: 4000,
  isProduction,

  mongodb: 'mongodb://localhost:27017/feedback'
}
