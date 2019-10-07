const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: {
        //using the ID created by mongodb
        type: mongoose.Schema.Types.ObjectId,
        //showing the model the ID represents
        ref: 'User',
    },
    //relation with the spot
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot',
    }
});

module.exports = mongoose.model('Booking', BookingSchema);