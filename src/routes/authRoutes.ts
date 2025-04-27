// backend/routes/authRoutes.ts
/*
import express from 'express';
import { loginUser } from '../controllers/authController';  // Import your controller function
import { body, validationResult } from 'express-validator';  // Optional: for validation

const router = express.Router();

// POST route to handle login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    body('role').isIn(['admin', 'manager']).withMessage('Invalid role'),
  ],
  async (req, res) => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Call the controller function to handle the login logic
    return await loginUser(req, res);
  }
);

export default router;
*/