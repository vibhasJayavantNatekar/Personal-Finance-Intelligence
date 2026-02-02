const mongoose = require('mongoose')

function connect (){
  
    mongoose.connect("mongodb://localhost:27017/personal-finance")
    .then(()=>{
        console.log("Connection successfull")
    })
    .catch((err)=>{
        console.log(err);
        
    })
}

module.exports = {connect}