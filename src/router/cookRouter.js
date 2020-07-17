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
        if(!cookd){
            throw new Error()
        }
<<<<<<< HEAD
=======
        
>>>>>>> f119ae13182a55acf9af9baf3cf5c56b4e4648c8
        res.send(cookd)
    }
    catch(e){
        res.status(500).send()
    }
})

<<<<<<< HEAD
// GET :/cook/id
router.get('/cook/:id',async (req,res)=>{
    const _id = req.params.id
    try{
        const cookdata = await cook.findOne({_id:_id})
        if(!cookdata){
            throw new Error()
        }
        res.send(cookdata)

    }catch(e){
        res.status(500).send()
    }
})

module.exports = router
=======
module.exports = router
>>>>>>> f119ae13182a55acf9af9baf3cf5c56b4e4648c8
