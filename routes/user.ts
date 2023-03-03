import express from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../handler/user';
import { checkToken } from '../middleware/middleware';

const router = express.Router();

// Get all users
router.get('/', checkToken ,async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a user by ID
router.get('/:userId', checkToken,async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a user by ID
router.patch('/:userId', checkToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const { username } = req.body;
    const user = await updateUser(userId, username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a user by ID
router.delete('/:userId', checkToken,async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await deleteUser(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
