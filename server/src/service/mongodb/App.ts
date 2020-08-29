import mongoose from 'mongoose'

const schema = new mongoose.Schema<Model.App>({
  name: String,
  appId: String,
  hosts: Array,
  timestamp: Number,
  createAt: Date
})

const App = mongoose.model('App', schema)

export default App
