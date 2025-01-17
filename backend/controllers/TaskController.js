import Task from '../models/Tasks.model.js'

const createTask = async (req, res) => {
  const task = req.body;

  if (!task.title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const newTask = new Task(task);
    await newTask.save();
    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    res.status(500).json({ error: "Failed to create task", details: err.message });
  }
};

const getTasksByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks", details: err.message });
  }

};

const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task", details: err.message });
  }

}

const updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const task = req.body;

  try {
    await Task.findByIdAndUpdate(taskId, task);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update task", details: err.message });
  }

}

export {
  createTask,
  getTasksByUser,
  deleteTask,
  updateTask
}

