import express from 'express';
import { createTask, deleteTask, getTasksByUser, updateTask } from '../controllers/TaskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/:userId', getTasksByUser);
router.delete('/:taskId', deleteTask);
router.put("/:taskId", updateTask);

export default router;