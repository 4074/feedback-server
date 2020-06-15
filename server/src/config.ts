const isProduction = process.env.ENV === 'PRODUCTION'
const cookieKey = process.env.CookieKey || ''

export default {
    port: 4000,
    isProduction,
    cookieKey,
}
