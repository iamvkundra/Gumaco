const express = require('express')
const router = new express.Router()
const auth = require('../JWTauth/auth')
const uC = require('../controller/userController')
router.get('/login',(req,res)=>{
    res.render('index',{
        page:"LOGIN PAGE"
    })
})
router.post('/user/register',uC.userRegister)

router.post('/user/login',uC.userLogin)

router.post('/user/logout',auth,uC.userLogout)

router.post('/user/logoutall',auth,uC.userLogoutAll)

router.get('/user/authorization/check',auth,(req,res)=>{
   
    res.send("working")
})

module.exports = router