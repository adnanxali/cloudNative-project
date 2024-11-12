const Employee =require('../Schema/EmployeeSchema');
const {employeeInputs,loginInputs} = require('../Schema/ValidationSchema');
const jwt = require('jsonwebtoken');
const jwt_sec="passkey";
const bcrypt = require('bcrypt')

async function employeeSignup(req, res, next) {
    const emp = req.body;
    const exist = await Employee.findOne({ name: emp.name, email: emp.email });
    const {success,error} = employeeInputs.safeParse(emp);
    if(!success){
        console.log(error);
        res.status(403).json({
            success:false,
            msg:error
        })
        return;
    }
    if (exist) {
        console.log("Employee exists log");
        res.status(409).json({
            success: false,
            msg: "User already exists!"
        });
        return;
    }
    const hashedPassword = await bcrypt.hash(emp.password,10);
    
    const newEmployee = new Employee({
        name:emp.name,
        email:emp.email,
        department:emp.department,
        password:hashedPassword
    });
    await newEmployee.save();
    const token = jwt.sign({ id: newEmployee._id }, jwt_sec, { expiresIn: '1h' });
    res.cookie('token',token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000,
    })
    return res.status(200).json({
        success: true,
        msg: "Employee Registered!",
        data: newEmployee,
        id:newEmployee._id
    });
}


async function employeeLogin(req,res,next){
    const emp = req.body;
    const exist =await Employee.findOne({email:emp.email});
    const {success,error}= loginInputs.safeParse(emp);
    if(!success){
        return res.status(403).json({
            success:false,
            msg:error
        })
    }
    if(!exist){
        return res.status(404).json({
            success:false,
            msg:"User not Found Wrong Inputs"
        })
        
    }
    const match = await bcrypt.compare(emp.password,exist.password)
    console.log(match)
    if(!match){
        res.status(403).json({
            success:false,
            msg:"Wrong password or email"
        })
        return;
    }
    const token = jwt.sign({id:exist._id},jwt_sec,{expiresIn:'1h'})
    res.cookie('token',token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000,
    })
    return res.status(200).json({
        
        success:true,
        msg:"Success full login !",
        data:exist,
        id:exist._id
    })
}

async function getEmployees(req,res,next){
    const data= await Employee.find();
    if(data){

        return res.status(200).json({
            success:true,
            msg:"All Employee",
            data:data
        });
        
    }else{
        return res.status(404).json({
            success:false,
            msg:"No Employee data available"
        })
    }
}
async function getEmployee(req,res,next){
    const id = req.params.id
    const data= await Employee.findById(id);
    if(data){

        return res.status(200).json({
            success:true,
            msg:"Employee data",
            data:data
        });
        
    }else{
        return res.status(404).json({
            success:false,
            msg:"No Employee data available"
        })
    }
}

async function promoteEmployee(req,res,next){
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndUpdate(id, { isAdmin: true }, { new: true });
        if (!employee) {
          return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee promoted to admin', employee });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
}
async function deleteEmployee(req,res,next){
    try {
        const employeeId = req.params.id;
        await Employee.findByIdAndDelete(employeeId);
        res.status(200).json({ message: 'Employee deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error });
      }
 }
 async function sendStatus(req,res,next){
    console.log(req.user);
    res.status(200).json({
        success: true,
        msg: 'Token is valid',
        id:req.user.id
    });
 }

module.exports={employeeLogin,employeeSignup,getEmployee,getEmployees,promoteEmployee,deleteEmployee,sendStatus};