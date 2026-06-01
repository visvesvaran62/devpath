import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

// @route   PATCH /api/user/profile
// @desc    Update user profile details
router.patch('/profile', async (req, res) => {
  try {
    const { name, bio, role, github, linkedin, avatarSeed } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (role) user.role = role;
    if (github !== undefined) user.github = github;
    if (linkedin !== undefined) user.linkedin = linkedin;
    if (avatarSeed) {
      user.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`;
    }

    await user.save();
    
    const userResponse = user.toObject();
    delete userResponse.password;
    res.json(userResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/user/roadmap
// @desc    Save currentPath and roadmapSteps to user
router.patch('/roadmap', async (req, res) => {
  try {
    const { currentPath, roadmapSteps } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (currentPath) user.currentPath = currentPath;
    if (roadmapSteps) user.roadmapSteps = roadmapSteps;

    await user.save();
    res.json({ currentPath: user.currentPath, roadmapSteps: user.roadmapSteps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/user/streak
// @desc    Increment streak and update badges
router.patch('/streak', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.streak += 1;
    user.tasksDone = (user.tasksDone || 0) + 1;
    
    // Simple logic to add a badge based on streak
    if (user.streak === 1) {
      const hasFirstBadge = user.badges.find(b => b.id === 'streak-1');
      if (!hasFirstBadge) {
        user.badges.push({ id: 'streak-1', name: 'First Milestone', icon: '🔥' });
      }
    } else if (user.streak === 7) {
      const hasSevenBadge = user.badges.find(b => b.id === 'streak-7');
      if (!hasSevenBadge) {
        user.badges.push({ id: 'streak-7', name: 'Week Warrior', icon: '⚔️' });
      }
    }

    await user.save();
    res.json({ streak: user.streak, badges: user.badges });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/user/notes
// @desc    Update global notes
router.patch('/notes', async (req, res) => {
  try {
    const { globalNotes } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.globalNotes = globalNotes;
    await user.save();
    res.json({ globalNotes: user.globalNotes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
