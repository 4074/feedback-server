import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: String,
    appId: { type: String, index: true},
    hosts: Array,
    actions: Array,
    setup: {
      auto: Boolean,
      include: [String],
      option: {type: Object, default: {}}
    },
    timestamp: Number,
    createAt: Date
  },
  {
    collection: 'fbs_apps',
    minimize: false
  }
)

const App = mongoose.model('App', schema)

export default App
