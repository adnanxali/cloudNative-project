const mongoose = require("mongoose");
const { boolean } = require("zod");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name:{type:String,required:true,},
    password:{type:String,required:true},
    email:{type:String,required:true},
    department:{type:String,require:true},
    isAdmin:{type:Boolean,required:true,default:false}
});

module.exports= mongoose.model('Employee',EmployeeSchema);