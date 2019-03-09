import express from 'express';
const router = express.Router();

// Example route -> GET /example
router.get('/', (req, res) => {
  res.json({ lat: 45.49372, long: -73.56413 });
});

export default router;
