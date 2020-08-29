/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import BaseStorage from './BaseStorage'

export default class AwsStorage extends BaseStorage {
  async upload(files: File[]): Promise<string[]> {
    return []
  }
}
