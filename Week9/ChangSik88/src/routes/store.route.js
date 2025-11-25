import express from 'express';
import { 
    handleListStoreMission,
 } from '../controllers/mission.controller.js';
import {handleListStoreReviews} from '../controllers/review.controller.js'

const router = express.Router();

router.get("/:storeId/reviews", handleListStoreReviews);
router.get("/:storeId/missions", handleListStoreMission);

export default router;