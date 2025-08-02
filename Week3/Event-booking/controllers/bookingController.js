const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.bookEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    const existing = await Booking.findOne({ user: req.user._id, event: event._id });
    if (existing) return res.status(400).json({ msg: 'Already booked' });

    if (event.bookings.length >= event.capacity) return res.status(400).json({ msg: 'Event full' });

    const booking = new Booking({ user: req.user._id, event: event._id });
    await booking.save();

    event.bookings.push(booking._id);
    await event.save();

    res.json({ msg: 'Booked', booking });
  } catch {
    res.status(500).send('Server Error');
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({ user: req.user._id, event: req.params.eventId });
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });

    await Event.findByIdAndUpdate(req.params.eventId, { $pull: { bookings: booking._id } });
    res.json({ msg: 'Cancelled' });
  } catch {
    res.status(500).send('Server Error');
  }
};
