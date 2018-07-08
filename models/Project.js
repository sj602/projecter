const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const projectSchema = new Schema({
    title: String,
    progress: String,
    dueDate: String,
    description: String,
    milestone: Array,
});

module.exports = mongoose.model('Project', projectSchema);