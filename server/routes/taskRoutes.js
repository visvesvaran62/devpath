import express from 'express';
import Task from '../models/Task.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

// @route   GET /api/tasks
// @desc    Get all tasks for logged-in user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, difficulty, difficultyColor, time } = req.body;
    
    if (!title || !difficulty || !difficultyColor || !time) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const task = new Task({
      userId: req.userId,
      title,
      description,
      difficulty,
      difficultyColor,
      time
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/tasks/:id
// @desc    Update a task (toggle complete, edit etc.)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const allowedUpdates = ['title', 'description', 'difficulty', 'difficultyColor', 'time', 'completed'];

    const task = await Task.findOne({ _id: id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    Object.keys(updates).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        task[key] = updates[key];
      }
    });

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
