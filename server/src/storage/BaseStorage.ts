/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { UploadFile } from '.'

export default class BaseStorage {
  public async upload(files: UploadFile[]): Promise<string[]> {
    const promises = []
    for (const file of files) {
      promises.push(this.uploadOne(file))
    }
    return Promise.all(promises)
  }

  public async uploadOne(file: UploadFile): Promise<string> {
    return ''
  }
}
