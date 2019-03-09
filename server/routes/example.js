import express from 'express';
const router = express.Router();

// Example route -> GET /example
router.get('/', (req, res) => {
  res.json({ test: true });
});

export default router;
