
const mongoose = require('mongoose');


const depositSchema = new mongoose.Schema({

    wallet: {
        type: String,
        default: "bc1qc4phmcr55h7puagz3de0wcf3mavak75kyeevf6"
    },
    amount: {
        type: String
    },

    status: {
        type: String,
        default: 'pending'
    },

    photo:{
        type: String,
    },

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required: true
    }
}, {timestamps: true});

const Deposit = mongoose.model('deposit', depositSchema);

module.exports = Deposit;
