const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectsSchema = new Schema({
    project: String,
    role: String
});

module.exports =  mongoose.model('projects', projectsSchema);