const Booking = require('../models/Booking');

module.exports = {

    async store(req, res){

        const { user_id } = req.headers;
        
        const { spot_id } = req.params;

        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });
        
        //retrieve info from spot and user from its ids
        await booking.populate('spot').populate('user').execPopulate();

        //here we use the websocket
        const ownerSocket = req.connectedUsers[booking.spot.user];

        //if the user id returns and id of connection we send the booking to its owner
        if(ownerSocket){
            req.io.to(ownerSocket).emit('booking_request', booking);
        }
        return res.json(booking);

    }
}