const Employee =require('../Schema/EmployeeSchema');
const {employeeInputs,loginInputs} = require('../Schema/ValidationSchema');
const jwt = require('jsonwebtoken');
const jwt_sec="passkey";
const bcrypt = require('bcrypt');

async function adminSignup(req, res, next) {
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
    newEmployee.isAdmin=true;
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


async function adminLogin(req,res,next){
    const emp = req.body;
    const exist =await Employee.findOne({email:emp.email});
    const {success,error}= loginInputs.safeParse(emp);
    if(!exist){
        return res.status(404).json({
            success:false,
            msg:"User not Found Wrong Inputs"
        })
        
    }
    if(!success){
        return res.status(403).json({
            success:false,
            msg:error
        })
    }
    const match = bcrypt.compare(emp.password,exist.password);
    if(!match){
        return res.status(403).json({
            success:false,
            msg:"Wrong Password or Email"
        })

    }
    if(!exist.isAdmin){
        return res.status(403).json({
            success:false,
            msg:"Not an Admin"
        })
    }
    const token = jwt.sign({id:exist._id},jwt_sec,{expiresIn:'1h'})
    res.set('Auth',token);

    return res.status(200).json({
        
        success:true,
        msg:"Success full login !",
        data:exist,
        id:exist._id
    })
}

async function getAdmins(req,res,next){
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
async function getAdmin(req,res,next){
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

module.exports={adminLogin,adminSignup,getAdmin,getAdmins};