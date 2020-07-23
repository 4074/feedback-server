import mongoose from 'mongoose'
import config from '@server/config'

export default function connect(): void {
  mongoose.connect(config.mongodb, { useNewUrlParser: true })
}
