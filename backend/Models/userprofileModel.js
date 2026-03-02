// User ID (reference to User)

// Monthly income

// Savings goal

// Risk preference (low / medium / high)

// Last updated date

const mongoose  = require('mongoose')
const moongoose = require('mongoose')

const currentDate = new Date();
 


const userProfileSchema = moongoose.Schema(
    {
        userID : {
            type:mongoose.Schema.Types.ObjectId,
            ref: "user",
            required:true
        },
        monthly_income:{
            type:Number

        },
        risk_preference :{
            type:String,
            enum:["low" , "medium" , "high"]
        },
        employment_type :{
              type:String,
              enum:["salaried", "self_employed", "business", "student"]
        },
        last_updated:{
            type:Date,
            default: Date.now

        }

    }
)

module.exports = mongoose.model('userProfile' , userProfileSchema)