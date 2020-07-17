const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const UserSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true,
    },
    Number:{
        type:Number,
        required:true,
        trim:true,
        validate(value){
            if(!value.length === 10){
                throw new Error('Incorrect Number, Required 10 digits')
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(value === 'password' || validator.contains(value,['password','Password'])){
                throw new Error('password should not conatin Password word. Please choose Strong Password')
            }         
         }
    },
    address:{
        fullAddress:{
            type:String,
            trim:true
        },
        pincode:{
            type:Number,
            trim:true
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
UserSchema.methods.toJSON =function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
   // delete userObject.tokens
    return userObject
}
UserSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},"gumaco.com")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
UserSchema.statics.getTheAuthentication = async (Number,password)=>{
    const validEmail = await User.findOne({Number})
    if(!validEmail){
        throw new Error('Not a Valid User')
    }
    if(validEmail.password !== password){
        throw new Error('Password not matched')
    }
    return validEmail
}
const User = mongoose.model('User',UserSchema)
module.exports = User