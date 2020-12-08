import config from '@server/config'
import BaseStorage from './BaseStorage'
import AwsStorage from './AwsStorage'

export interface UploadFile {
  path: string
  name: string
}

export class Storage extends BaseStorage {
  public instance: BaseStorage

  public constructor(type: string) {
    super()
    switch (type) {
      case 'aws': {
        this.instance = new AwsStorage()
        break
      }
      default:
        this.instance = new BaseStorage()
    }
  }

  public async upload(files: UploadFile[]): Promise<string[]> {
    return this.instance.upload(files)
  }
}

export default new Storage(config.storage)
