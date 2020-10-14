const express = require('express')
const cookie = require('cookie-parser')
require('../src/DBConnector/db') 
const user = require('../src/router/userRouter')

const cook = require('../src/router/cookRouter')
const path = require('path')
const hbs = require('hbs')
var multer = require('multer')
const cookieParser = require('cookie-parser')
var upload = multer()
const app = express()
const port = process.env.PORT

const pathValue = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../Template/views')
const partials = path.join(__dirname,'../Template/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partials)
app.use(express.static(pathValue))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(upload.array())
app.use(cook)

app.use(user)


app.get('*',(req,res)=>{
    res.render('404',{
        user:"Mayank Kumar"
    })
})
app.listen(port,()=>{
    console.log('Gumaco is Up on Port '+ port)
})

