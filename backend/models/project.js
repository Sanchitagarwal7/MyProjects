const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProjectSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    summary:{
        type: String,
        required: true
    },
    roadmap:{
        type: String,
        default: ''
    },
    category: {
        type: String,
        required: true
    },
    tags:{
        type: [String],
        default: []
    },
    meta:{
        likes: Number,
        default: 0
    }
});

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;