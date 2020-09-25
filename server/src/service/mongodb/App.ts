import mongoose from 'mongoose'

const schema = new mongoose.Schema<Model.App>(
  {
    name: String,
    appId: String,
    hosts: Array,
    actions: Array,
    timestamp: Number,
    createAt: Date
  },
  {
    collection: 'fbs_apps'
  }
)

const App = mongoose.model('App', schema)

export default App
