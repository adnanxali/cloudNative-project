const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String},
    password:{type:String,required:true},
    adminId:{type:String,required:true}
    
});

module.exports= mongoose.model('Admin',AdminSchema);