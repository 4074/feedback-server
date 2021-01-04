import path from 'path'
import spawn from 'cross-spawn'
import config from './config'

const sdkdir = path.resolve(__dirname, '../../feedbackjs')

export default (app: Model.App) => {
  const envs = {
    output: path.join(__dirname, '..', 'sdks', app.appId),
    AppId: app.appId,
    AutoSetup: app.setup.auto,
    CustomDefaultOption: Buffer.from(JSON.stringify({
      server: `${config.publicHost}/receive` ,
      ...app.setup.option
    })).toString('base64')
  }
  const envsArr = []
  for (const key of Object.keys(envs)) {
    envsArr.push(`--env.${key}=${envs[key]}`)
  }

  spawn('yarn', [
    'build',
    ...envsArr
  ], { stdio: 'inherit', cwd: sdkdir })
}
