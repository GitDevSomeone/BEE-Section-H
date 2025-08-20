const express = require('express')
const session = require('express-session')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const app = express()

app.use(session({
    secret: "this is my secret",
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly: true,
    }
}))
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded())



app.use("/", authRoute)
app.use("/user", userRoute)
app.use("/admin", adminRoute)


app.listen(3000, ()=>{
    console.log('server started ...')
})