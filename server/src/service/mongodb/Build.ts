import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    appId: { type: String, index: true},
    content: String,
    createAt: Date
  },
  {
    collection: 'fbs_builds',
    minimize: false
  }
)

const Build = mongoose.model('Build', schema)

export default Build
