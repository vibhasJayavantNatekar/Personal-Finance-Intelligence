const mongoose = require('mongoose')

const currentDate = new Date();

const expenseSchema = mongoose.Schema(
    {
        userID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:true

        },
        amt:{
            type:String,
            required:true

        },
        category:{
            type:String,
            enum:["food","travel","bills"],
            default:"bills"

        },
        date:{
            type:Date,
            default:currentDate.toLocaleString()

        }
    }
)


module.exports = mongoose.model('expense' , expenseSchema)
