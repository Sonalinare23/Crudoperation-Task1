const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstname:String,
    lname:String,
    roll_no:String,
    age:Number
})

module.exports = mongoose.model('Student', StudentSchema)