import express from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/UserController.js';

const router = express.Router()

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:userId", getUser)
router.delete("/:userId", deleteUser)
router.put("/:userId", updateUser)

export default router;