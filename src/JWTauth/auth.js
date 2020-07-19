const jwt = require('jsonwebtoken')
const user = require('../model/user')

const auth = async (req,res,next)=>{
  
  try{
     const token = req.header('Authorization').replace('Bearer ', '')
    const decode = jwt.verify(token,process.env.SECRET_KEY)
    const user1 = await user.findOne({'_id':decode._id,'tokens.token':token})
    if(!user1){
        throw new Error()
        }
        req.token = token
        req.user=user1
        next()
    }catch(e){
        res.status(401).send({ error: 'Please authenticate.' })
    }

}
module.exports = auth