import { Router, Request } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request type to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const router = Router();
const JWT_SECRET = 'your_jwt_secret';

const categories = [
  'Fuel',
  'Household',
  'EMI',
  'Bills',
  'Health',
  'Useless'
];

const expenses: any[] = [];

function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

router.get('/categories', (req, res) => {
  res.json(categories);
});

router.post('/', authenticateToken, (req, res) => {
  const { amount, category, description } = req.body;
  if (!categories.includes(category)) {
    return res.status(400).json({ message: 'Invalid category' });
  }
  expenses.push({
    username: req.user.username,
    amount,
    category,
    description,
    date: new Date()
  });
  res.status(201).json({ message: 'Expense added' });
});

router.get('/', authenticateToken, (req, res) => {
  const userExpenses = expenses.filter(e => e.username === req.user.username);
  res.json(userExpenses);
});

export default router;
