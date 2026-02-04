const express = require('express')
const {connect} =require('./Config/connect')
const userRoutes = require('./Routes/userRoutes')
const expenseRoutes = require('./Routes/expenseRoute')
const investmentRoutes = require("./Routes/investmentRoute")
const loanRoutes = require('./Routes/loanRoutes')
const healthRoutes = require('./Routes/healthRoute')
const finnhub = require('finnhub')


const app = express()


app.use(express.json())

//DB Connection

connect()


//Routes
app.use('/user/api/v1/',userRoutes)
app.use('/expenses/api/v1',expenseRoutes)
app.use('/investment/api/v1',investmentRoutes)
app.use('/loan/api/v1',loanRoutes)
app.use('/health/api/v1',healthRoutes)


app.listen(5000 , ()=>{
    console.log("http://localhost:5000/");
    

})