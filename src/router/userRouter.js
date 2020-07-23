const express = require('express')
const router = new express.Router()
const auth = require('../JWTauth/auth')
const uC = require('../controller/userController')
// REGISTER THE USER AND LOGIN WITH THE SAME TIME

router.post('/user/register',uC.userRegister)

router.post('/user/login',uC.userLogin)

router.post('/user/logout',auth,uC.userLogout)

router.post('/user/logoutall',auth,uC.userLogoutAll)

router.get('/user/authorization/check',auth,(req,res)=>{
   // const search = req.query.
    res.send("working")
})

module.exports = router