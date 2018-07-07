const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSessionSchema = new Schema({
    id: String,
    timestamp: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('UserSession', userSessionSchema);