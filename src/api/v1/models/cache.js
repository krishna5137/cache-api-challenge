import mongoose from "mongoose"

const cacheSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: String,
    required: true
  },
  lastAccess: {
    type: Date,
    required: true
  }
})

const Cache = mongoose.model('Cache', cacheSchema)

module.exports = Cache