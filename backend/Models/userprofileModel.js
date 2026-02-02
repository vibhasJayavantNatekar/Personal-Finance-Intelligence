// User ID (reference to User)

// Monthly income

// Savings goal

// Risk preference (low / medium / high)

// Last updated date

const { default: mongoose } = require('mongoose')
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
            type:String,

        },
        risk_preference :{
            type:String,
            enum:["low" , "medium" , "high"]
        },
        last_updated:{
            type:Date,
            default:currentDate.toLocaleString()
        }

    }
)

module.exports = mongoose.model('userProfile' , userProfileSchema)