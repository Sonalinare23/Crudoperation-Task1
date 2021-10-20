const mongoose = require('mongoose')

const marksSchema = new mongoose.Schema({
    firstname : {
        type:String,
        ref:'Student'
    },
    english: {
        type: Number,
        required: true
    },
    math: {
        type: Number,
        required: true
    },
    science: {
        type: Number,
        required: true
    },
   
})

module.exports = mongoose.model('Student_Marks',marksSchema)