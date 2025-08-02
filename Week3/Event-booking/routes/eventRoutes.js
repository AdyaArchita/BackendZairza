const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

// Public - View all events
router.get('/', getEvents);

// Admin only - Create, Update, Delete events
router.post('/', auth, role('admin'), createEvent);
router.put('/:id', auth, role('admin'), updateEvent);
router.delete('/:id', auth, role('admin'), deleteEvent);

module.exports = router;
