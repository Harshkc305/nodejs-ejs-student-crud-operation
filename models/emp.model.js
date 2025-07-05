const mongoose= require("mongoose");

const EmpSchema= new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phonenumber:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    basesalary:{
        type: String,
        required: true
    },
    isDeleted:{
        type: Boolean,
        default:false
    },
    profileImage:{
        type: String,
        default:""
    },
    resume:{
        type: String,
        default: ""
    }
},{
    timestamps:true,
    versionKey:false
})

const EmpModel= new mongoose.model("salary",EmpSchema);
module.exports= EmpModel