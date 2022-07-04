// IMPORTS 
let express = require('express')
let bodyParser = require('body-parser')

// imports via dossier
let apiRouter = require('./apiRouter')

//---
let server = express()

server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())

//-- routes

server.get('/',(request,response) => {
    response.setHeader('Content-Type','text/html')
    response.status(200).send('<h1> Bonjour Jarvis</h1>')
})

// Router API
//server.use('/api/',apiRouter)


// PORT

server.listen(8092,()=>{
    console.log('Serveur en marche maitre');
})

