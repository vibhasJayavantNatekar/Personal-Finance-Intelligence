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
            type:Number,
            required:true

        },
        category:{
            type:String,
            enum:["food","travel","bills" , "rent","groceries","utilities","internet","medical","education","transport","fuel",  "insurance","shopping","entertainment","dining_out","travel","subscriptions","tax","other"],
            default:"bills"

        },
        date:{
            type:Date,
            default: Date.now

        }
    }
)


module.exports = mongoose.model('expense' , expenseSchema)



