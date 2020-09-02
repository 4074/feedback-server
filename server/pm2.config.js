module.exports = {
  apps: [
    {
      name: 'feedback-server',
      script: 'build/index.js',
      env: {
        NODE_ENV: 'production',
        PM2: '1'
      }
    },
    {
      name: 'feedback-server-public',
      script: 'build/public.js',
      env: {
        NODE_ENV: 'production',
        PM2: '1'
      }
    }
  ]
}
