import express from 'express';
const router = express.Router();

// Example route -> GET /example
router.get('/', (req, res) => {
  res.json({ "lat": 45.493720, "long": -73.564130});
});

export default router;
