const express = require('express')
require('../src/DBConnector/db') // database connector. Please specify the api and port number.
const user = require('../src/router/userRouter')
const cook = require('../src/router/cookRouter')
const app = express()

const port = process.env.PORT || 2000

app.use(express.json())
app.use(cook)
app.use(user)


app.listen(port,()=>{
    console.log('Gumaco is Up on Port 2000')
})

