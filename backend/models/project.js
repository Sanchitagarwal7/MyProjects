const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProjectSchema = new Schema({
    role:{
        type: [String],
        required: true
    },
    title:{
        type: String,
        required: true
    },
    summary:{
        type: String,
        required: true
    },
    roadmap:{
        type: [String],
        default: []
    },
    category: {
        type: String,
        required: true
    },
    likes:{
        type: Number,
        default: '0'
    }
});

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;