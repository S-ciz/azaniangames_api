const mongoose = require('mongoose');


const SubscribeSchema = new mongoose.Schema({
    email: {
        type: String
    }
}, {timestamps: true})


const SubscribeModel = mongoose.model('subscriber', SubscribeSchema);

module.exports = SubscribeModel;