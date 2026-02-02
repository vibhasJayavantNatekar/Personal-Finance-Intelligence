const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const userProfile = require('../Models/userprofileModel')


const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true

        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password : {
            type:String ,
            required:true ,

        }

    }
)

userSchema.statics.createUser = async function (name , email , password) {

    //Validate
    if(!name || !email){
        throw Error ("All Fields are required")
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    
    const exists = await this.findOne({email})

    if(exists){
        throw Error("Email is already use !")
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);

    const hashPassword =   await bcrypt.hash(password ,salt)


    const user  = await this.create({name , email , password : hashPassword})
       

    return user

    
}


// user.statics.deleteUser = async function (id) {

//     const profile = userProfile.find
    
// }


module.exports = mongoose.model('user',userSchema)