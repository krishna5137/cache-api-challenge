import express from "express"
import cacheController from "../controllers/cacheController"

const router = express.Router()

router.get("/", cacheController.getAllCacheItems);
router.get("/:id", cacheController.getCacheItemById)

module.exports = router;