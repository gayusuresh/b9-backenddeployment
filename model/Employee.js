const mongoose= require('mongoose')

const EmployeeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        unique:true,
    },    
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },

password:{
        type:String,
        required:[true,"password is required"],
        unique:true,
    }})


const EmployeeModel=mongoose.model("employees",EmployeeSchema)
module.exports=EmployeeModel