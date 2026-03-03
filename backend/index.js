const express = require('express')
const {connect} =require('./Config/connect')
const userRoutes = require('./Routes/userRoutes')
const expenseRoutes = require('./Routes/expenseRoute')
const investmentRoutes = require("./Routes/investmentRoute")
const loanRoutes = require('./Routes/loanRoutes')
const healthRoutes = require('./Routes/healthRoute')
const authRoutes = require('./Routes/authRoutes')

const app = express()

app.use(express.json())


const PORT = process.env.port || 5000


//DB Connection

connect()



//Routes
app.use('/user/api/v1/',userRoutes)
app.use('/auth/api/v1' ,authRoutes)
app.use('/expenses/api/v1',expenseRoutes)
app.use('/investment/api/v1',investmentRoutes)
app.use('/loan/api/v1',loanRoutes)
app.use('/health/api/v1',healthRoutes)


app.listen(PORT , ()=>{
    console.log(`http://localhost:${PORT}`);
    

})