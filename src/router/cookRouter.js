const express = require('express')
const router = new express.Router()
const cook = require('../model/cook')
const auth = require('../JWTauth/auth')

router.post('/cook/create',auth,async (req,res)=>{
    const cookdata = new cook(req.body)
    try{
        await cookdata.save()
        res.send()

    }catch(e){
        res.status(500).send()
    }
})
//GET :/cook?L=locationNAME&sL=sub_locationNAME

router.get('/cook',auth,async (req,res)=>{
    const L = req.query.L
    const sL = req.query.sL
    try{
        const cookd = await cook.find({Location:L,SLocation:sL})
        
        res.send(cookd)
    }
    catch(e){
        res.status(500).send()
    }
})

module.exports = router
