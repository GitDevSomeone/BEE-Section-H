const {Router} = require('express')
const path = require('path')
const protectRoute = require("../middleware/protectRoute")

const router = Router()

router.get('/home', protectRoute.protect, protectRoute.roleAuth , (req, res)=>{
    res.sendFile(path.join(__dirname, "../pages", "adminhome.html"))
})

module.exports = router


