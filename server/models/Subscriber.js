const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema({

    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    
}, {timestamps: true})
//timestamps => 만든 date, update date 표시가 됨
    

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber }