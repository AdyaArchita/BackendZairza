const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: String,
  capacity: Number,
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
});
module.exports = mongoose.model('Event', EventSchema);
