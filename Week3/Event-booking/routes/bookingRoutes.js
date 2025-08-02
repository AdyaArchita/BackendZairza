const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { bookEvent, cancelBooking } = require('../controllers/bookingController');

router.post('/:eventId', auth, bookEvent);
router.delete('/:eventId', auth, cancelBooking);

module.exports = router;
