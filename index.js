const express=require("express")
const mongoose=require('mongoose')
const cors=require("cors")
const EmployeeModel=require('./model/Employee')
const app=express()
app.use(express.json())
app.use(cors())
const handleErrors = (err) => {
    let errors = { email: "", password: "" };
  
    console.log(err);
    if (err.message === "incorrect email") {
      errors.email = "That email is not registered";
    }
  
    if (err.message === "incorrect password") {
      errors.password = "That password is incorrect";
    }
  
    if (err.code === 11000) {
      errors.email = "Email is already registered";
      return errors;
    }
  
    if (err.message.includes("Users validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  };
  
mongoose.connect("mongodb://127.0.0.1:27017/b9")
app.post('/register',(req,res)=>{
    try{
    EmployeeModel.create(req.body)
    .then(employees=>res.json(employees))

    .catch(err=>res.json(err))

    }
catch(err)
{
    console.log(err);

    const errors = handleErrors(err);
    res.json({ errors, created: false });

}


})

app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    EmployeeModel.findOne({email:email})
    .then(user=>{
        if(user.password==password)
        {
            res.json("success");
        }
        else(user.password==password)
            {
                res.json("incorrect password");
            }
    })


})

app.listen(4000, ()=>{
    console.log("server is running")

})