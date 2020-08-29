import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  appId: String,
  path: String,
  userAgent: String,
  user: String,
  action: String,
  data: Object,
  message: String,
  images: Array,
  timestamp: Number,
  createAt: Date
})

const Feedback = mongoose.model('Feedback', schema)

export default Feedback
