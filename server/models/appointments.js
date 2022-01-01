const mongoose = require('mongoose')

const appointmentSchema=new mongoose.Schema({
    doctor:{
        type:String,
        required: true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:Array,
        required:false
    }
})

const Appointment=mongoose.model("APPOINTMENT", appointmentSchema)
module.exports = Appointment