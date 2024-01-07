const mongoose = require('mongoose');
const {Schema} = mongoose;

const RoleSchema = new Schema({
    role:{
        type: String,
        required: true
    }
});

const Role = mongoose.model('role', RoleSchema);
module.exports = Role;