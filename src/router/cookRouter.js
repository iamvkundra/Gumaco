const express = require('express')
const router = new express.Router()
const cook = require('../model/cook')
const auth = require('../JWTauth/auth')

router.post('/cook/search',auth,async (req,res)=>{
    const place_name =req.query.place_name
    const longitude = req.query.longitude
    const latitude = req.query.latitude
    try{
    res.send({place_name,longitude,latitude})
    }catch(e){
        res.status(500).send()
    }
})

router.post('/cook/create',auth,async (req,res)=>{
    const cookdata = new cook(req.body)
    try{
        await cookdata.save()
        res.send()

    }catch(e){
        res.status(500).send()
    }
})
router.get('/cook',auth,async (req,res)=>{
    const L = req.query.L
    const sL = req.query.sL
    try{
        const cookd = await cook.find({Location:L,SLocation:sL})
        if(!cookd){
            throw new Error()
        }
        res.send(cookd)
    }
    catch(e){
        res.status(500).send()
    }
})

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