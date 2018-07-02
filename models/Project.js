const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const projectSchema = new Schema({
    title: String,
    year: String,
    month: String,
    day: String
});

module.exports = mongoose.model('Project', projectSchema);