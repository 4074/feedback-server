/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import fs from 'fs'
import path from 'path'
import config from '../config'
import BaseStorage from './BaseStorage'
import { UploadFile } from '.'

export default class FileStorage extends BaseStorage {
  public dir: string

  public constructor(dir: string = 'upload') {
    super()
    this.dir = dir
  }

  public async uploadOne(file: UploadFile): Promise<string> {
    const filename = path.basename(file.path).replace('upload_', '')
    const filedir = path.join(config.root, '..', this.dir)

    if (!fs.existsSync(filedir)) fs.mkdirSync(filedir)
    fs.copyFileSync(file.path, path.join(filedir, filename))

    return `${config.host}/${filename}`
  }
}
