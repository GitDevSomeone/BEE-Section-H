const {Router} = require('express')
const path = require('path')
const fs = require('fs')

const router = Router()

router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "../pages", "login.html"))
})

router.get("/signup", (req, res)=>{
    res.sendFile(path.join(__dirname, "../pages", "signup.html"))
})

router.post('/signup', (req, res)=>{
    console.log(req.body)
    fs.readFile(path.join(__dirname, "../", "user.json"), (err, data)=>{
        data = JSON.parse(data);
        let userExist = data.find(user => user.username == req.body.username)
        if(userExist){
            res.json({message: "username already taken"})
        }else{
            let obj = {
                ...req.body,
                role: "user"
            }
            data.push(req.body)
            fs.writeFile(path.join(__dirname, "../", "user.json"), JSON.stringify(data), (err)=>{
                if(!err){
                    res.json({message: "user creation success"})
                }
            })
        }
    })
})

router.post('/login', (req, res)=>{
   
    fs.readFile(path.join(__dirname, "../", "user.json"), (err, data)=>{
         data = JSON.parse(data);
          let userExist = data.find(user => user.username == req.body.username)
          if(userExist){
            if(req.body.password == userExist.password){
                req.session.isLoggedIn = true;
                req.session.role = userExist.role
                if(userExist.role == "user"){
                    res.redirect('/user/home')
                }else{
                    res.redirect('/admin/home')
                }
                // res.json({message: "login success"})

            }else{
                res.json({message: "password did not match"})
            }
          }else{
                res.json({message: "user not found"})

          }
    })
})



module.exports = router