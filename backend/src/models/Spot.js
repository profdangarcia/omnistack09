const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    //user bellow refers to the user who did the register
    user: {
        //using the ID created by mongodb
        type: mongoose.Schema.Types.ObjectId,
        //showing the model the ID represents
        ref: 'User',
    }
}, {
    toJSON: {
        virtuals: true,
    },
});

//we create a virtual field for this model, this one will be compiled by JS
SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://192.168.10.121:3333/files/${this.thumbnail}`
});

module.exports = mongoose.model('Spot', SpotSchema);