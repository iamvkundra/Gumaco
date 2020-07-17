const mongoose = require('mongoose')

const cookSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Location:{
        type:String,
        lowercase:true,
    },
    SLocation:[{
        type:String
    }]
})
cookSchema.methods.toJSON = function(){
    const cook = this
    const cookObject = cook.toObject()
    delete cookObject._id
    delete cookObject.__v
    return cookObject

}

const cook = mongoose.model('CookData',cookSchema)

module.exports = cook
