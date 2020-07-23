import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: String,
  appId: String,
  appKey: String,
  hosts: Array,
  createAt: Date
})

const App = mongoose.model('App', schema)

export default App
