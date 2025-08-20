module.exports.protect = (req, res, next) => {
    if(req.session.isLoggedIn){
        next()
    }else{
        res.redirect("/")
    }
}

module.exports.roleAuth = (req, res, next)=>{
    if(req.session.role == 'user'){
        res.redirect('/user/home')
    }else{
        next()
    }   
}



