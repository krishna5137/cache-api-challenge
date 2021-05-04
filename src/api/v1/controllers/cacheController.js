import Cache from "../models/cache.js"

const cacheController = {}

cacheController.getAllCacheItems = async (req, res) => {
  const cacheItems = await Cache.find()
  res.status(200).json(cacheItems)
}

cacheController.getCacheItemById = async(req, res) => {
  const id = req.params.id;
  let cacheItem = Cache.findOne({ key: id})

  if (!cacheItem) {
    console.log("Cache Miss")
    return;
  }

  console.log("Cache Hit")
  res.status(200).send(cacheItem.value)
}

export default cacheController