const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const systemsSchema = new Schema({
    system: String
});

module.exports =  mongoose.model('systems', systemsSchema);