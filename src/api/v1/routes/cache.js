import express from "express"
import cacheController from "../controllers/cacheController.js"

const router = express.Router()

router.get("/", cacheController.getAllCacheItems)
router.get("/:id", cacheController.getCacheItemById)

router.delete("/", cacheController.flushAll)

export default router;