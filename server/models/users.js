const mongoose = require('mongoose')

const userSchema=new mongoose.Schema({
    user:{
        type:String,
        required: true
    },
    appointments:{
        type:Array,
        required:true
    }
})

const UserAppointment=mongoose.model("USER", userSchema)
module.exports = UserAppointment