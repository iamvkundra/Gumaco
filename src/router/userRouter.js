const express = require('express')
const router = new express.Router()
const user = require('../model/user')
const auth = require('../JWTauth/auth')

// REGISTER THE USER AND LOGIN WITH THE SAME TIME
router.post('/user/register',async (req,res)=>{
    
    const userdata = new user(req.body)
    try{
    await userdata.save()
    const token = await userdata.generateToken()
    res.send({userdata,token})
    }catch(e){
        res.status(400).send()
    }
})
// LOGIN POST METHOD
router.post('/user/login',async (req,res)=>{
    try{
    const userEmail = await user.getTheAuthentication(req.body.Number,req.body.password)
    const token = await userEmail.generateToken()
    if(!userEmail){
        res.status(404).send()
    }
    res.send({userEmail,token})
    }catch(e){
        res.status(404).send()
    }
})
// FOR A SINGLE DEVICE LOGOUT
router.post('/user/logout',auth, async (req,res)=>{
    try{
        
        req.user.tokens = req.user.tokens.filter((token)=>{
           token.token !== req.token // delete the token from database
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }

})
router.post('/user/logoutall',auth,async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()

    }
    catch(e){
        res.status(500).send()
    }
})
router.get('/user/authorization/check',auth,(req,res)=>{
   // const search = req.query.
    res.send("working")
})

module.exports = router