import express from 'express'
import { verification } from '../middleware/auth.js'
const router = express.Router()

// Read
router.get("/:id", verification,getUser);
router.get("/:id/friends",verification, getUserFriends);

// Update

router.put("/:id/:friendId", verification, addRemoveFriend)

export default router