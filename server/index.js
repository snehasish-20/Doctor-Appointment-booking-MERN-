const express = require('express')
const mongoose = require('mongoose')
const Appointment = require('./models/appointments')
const app=express()
const UserAppointmentModel=require("./models/users")
app.use(express.json())
var cors = require('cors')
app.use(cors()) 
mongoose.connect("mongodb+srv://kunal:kunal123@docappointment.tibsd.mongodb.net/DoctorAppointment?retryWrites=true&w=majority", {
    useNewUrlParser:true,
})
app.post('/book', async (req,res)=>{
    const userId=req.body.user
    const doctor=req.body.doctor
    const date=req.body.date
    const time=req.body.time
    try{
    Appointment.find({doctor:doctor, date:date}).then(async (exists)=>{
        if(exists[0])
         {
            try{
                await Appointment.updateOne({doctor:doctor, date:date},{ $addToSet: { time: time }})
            }
            catch(err)
            {
             console.log(err)
            }
         }
        else
        {
            const appointments= new Appointment({doctor:doctor,date:date,time:[time]})
            await appointments.save()
        }
    })

    UserAppointmentModel.find({user:userId}).then(async (exists)=>{
        if(exists[0])
         {
            try{
                await UserAppointmentModel.updateOne({user:userId},{ $addToSet: { appointments:{doctor:doctor,date:date,time:time}}})
            }
            catch(err)
            {
             console.log(err)
            }
         }
        else
        {
            const userData= new UserAppointmentModel({user:userId,appointments:[{doctor:doctor,date:date,time:time}]})
            await userData.save()
        }
    })
    res.send('booked')
    }
    catch (err)
    {
        res.send(err)
    }
})

app.get('/check', async (req,res)=>{
    const doc=req.query.doctor
    const date=req.query.date
    await Appointment.find({doctor:doc, date:date}).then(async (result)=>{
        console.log(result);
        res.send(result[0]?.time)
    })
})

app.get('/getAppointments', async (req,res)=>{
    const user=req.query.user
    await UserAppointmentModel.find({user:user}).then(async (result)=>{
        res.send(result)
    })
})


app.listen(3001,()=>{
    console.log("port 3001");
})
