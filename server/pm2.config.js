module.exports = {
  apps: [{
    name: 'feedback-server',
    script: 'build/index.js',
    env: {
      NODE_ENV: 'production'
    }
  }]
}