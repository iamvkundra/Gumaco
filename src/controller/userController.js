const user = require('../model/user')
const auth = require('../JWTauth/auth')

exports.userRegister = async function(req,res){
    
    const userdata = new user(req.body)
    try{
    await userdata.save()
    const token = await userdata.generateToken()
    res.send({userdata,token})
    }catch(e){
        res.status(400).send()
    }
}

exports.userLogin = async function(req,res){
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
}
exports.userLogout = async function(req,res){
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
        token.token !== req.token // delete the token from database
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
}
exports.userLogoutAll= async function(req,res){
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
    }
}