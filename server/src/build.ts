import path from 'path'
import spawn from 'cross-spawn'

const sdkdir = path.resolve(__dirname, '../../feedbackjs')

export default (app: Model.App) => {
  const envs = {
    output: path.join(__dirname, '..', 'sdks', app.appId),
    AppId: app.appId,
    AutoSetup: app.setup.auto,
    CustomDefaultOption: Buffer.from(JSON.stringify(app.setup.option)).toString('base64')
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
