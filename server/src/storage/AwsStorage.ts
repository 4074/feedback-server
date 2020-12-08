/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import fs from 'fs'
import path from 'path'
import * as AWS from 'aws-sdk'
import config from '../config'
import BaseStorage from './BaseStorage'
import { UploadFile } from '.'

export default class AwsStorage extends BaseStorage {
  public client: AWS.S3

  public constructor() {
    super()
    this.client = new AWS.S3({
      apiVersion: 'latest',
      endpoint: config.aws.endpoint,
      accessKeyId: config.aws.key,
      secretAccessKey: config.aws.secret
    })
  }

  public async uploadOne(file: UploadFile): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(file.path, (err, data) => {
        if (err) return reject(err)
        const name = path.basename(file.path).replace(/^upload_/, '')
        const params = {
          Bucket: config.aws.bucket,
          Key: name,
          Body: Buffer.from(data),
          ACL: 'public-read'
        }

        this.client.putObject(params, (error, res) => {
          if (error) {
            reject(error)
          } else {
            resolve(
              `${config.aws.endpoint.replace(
                '//',
                `//${config.aws.bucket}.`
              )}/${name}`
            )
          }
        })
      })
    })
  }
}
