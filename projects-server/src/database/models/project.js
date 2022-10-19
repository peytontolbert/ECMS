const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    project: String,
    systems:[
        { type: Schema.Types.ObjectId, ref: 'systems', require: true }
    ]
},{
    timestamps: true
});

module.exports =  mongoose.model('project', projectSchema);