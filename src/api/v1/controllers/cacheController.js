import Cache from "../models/cache.js"
import { v4 } from "uuid"

const cacheController = {}


const createDummyCache = async (key) => {
  try {
    // check for overflow
    const cacheItemsCount = await Cache.countDocuments({})

    if (cacheItemsCount >= process.env.MAX_CACHE_LIMIT) {
      // logic to handle overflow
      await cacheOverflowHelper()
    }
    
    const cacheItem = new Cache({
      key,
      value: v4(), // uuid to generate unique random values
      lastAccess: Date.now()
    })

    return await cacheItem.save()
  } catch (err) {
    console.log(err)
    throw err
  }
}

const cacheOverflowHelper = async () => {
  // deleting the oldest cacheItem
  try {
    const oldCache = (await Cache.find().sort({ lastAccess: 'asc' }))[0]
    await Cache.findByIdAndDelete({ _id: oldCache._id })
  } catch (err) {
    console.log(err)
    throw err
  }
}

// Boolean flag to check for ttl expiry
const isTTLExceeded = (cacheItem) => {
  console.log("Inside timeout flag!")
  return Boolean(Date.now() - cacheItem.lastAccess >= 1000 * process.env.TTL)
}

cacheController.getAllCacheItems = async (req, res) => {
  try {
    const cacheItems = await Cache.find()
    res.status(200).json(cacheItems)
  } catch(err) {
    res.status(500).json({ message: err.message})
  }
  
}

cacheController.getCacheItemById = async(req, res) => {
  try {
    const id = req.params.id;
    let cacheItem = await Cache.findOne({ key: id})

    // if no cacheItem create a new random dummy
    if (!cacheItem) {
      console.log("Cache Miss")
      // create new random string for the key
      const newCache = await createDummyCache(id)
      // update cache & return
      res.status(201).send(newCache.value)
      return;
    }

    // check for expired Items
    if (isTTLExceeded(cacheItem)) {
      console.log("Cache timedout!!")
      // if expired, remove and add random dummy
      await Cache.findByIdAndDelete({ _id: cacheItem._id})
      const newCache = await createDummyCache(id)
      // update cache & return
      res.status(201).send(newCache.value)
      return;
    }

    console.log("Cache Hit")
    res.status(200).send(cacheItem.value)
    // reset ttl on every read/cache hit
    await Cache.findByIdAndUpdate({_id: cacheItem._id}, { lastAccess: Date.now() })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

cacheController.flushAll = async (req, res) => {
  try {
    await Cache.deleteMany({})
    res.status(200).send("Delete all cache items success!")
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export default cacheController