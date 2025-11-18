import express from 'express';
import { handleUserSignUp } from "../controllers/user.controller.js";
import { handleListUserReviews } from '../controllers/review.controller.js';
import { handleListUserMission } from '../controllers/mission.controller.js';

const router = express.Router();

router.post("/signup", handleUserSignUp);
router.get(":userId/reviews", handleListUserReviews);
router.get("/:userId/missions", handleListUserMission);

export default router;