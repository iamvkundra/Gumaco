const express = require('express')
require('../src/DBConnector/db') 
const user = require('../src/router/userRouter')
const cook = require('../src/router/cookRouter')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT

const pathValue = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../Template/views')
const partials = path.join(__dirname,'../Template/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partials)
app.use(express.static(pathValue))

app.use(express.json())
app.use(cook)
app.use(user)

app.get('*',(req,res)=>{
    res.render('404')
})
app.listen(port,()=>{
    console.log('Gumaco is Up on Port '+ port)
})

