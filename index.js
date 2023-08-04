const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

const secretKey =  "thisisasecret"


app.get('/' , (req,res)=>{
    res.send("yes its working")
})

app.post('/login' , (req,res)=>{
    const user = {
        id :"1",
        name : "sahil",
        password : "tygai"
    }

    jwt.sign({user} ,secretKey , {expiresIn : '300s'} , (err,token)=>{
        res.json({
            token
        })
    })
})

app.post("/profile" , verifyToken, (req,res)=>{
    jwt.verify(req.token , secretKey , (err , authData)=>{
        if(err){
            res.send("invalid token")
        }else{
            res.json({
                message : "profile accessed",
                authData
            })
        }
    })
})


function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    console.log(bearerHeader);
    if( typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ")
        const token = bearer[1]
        req.token = token
        next()
        
    }else{
        res.send({
            result : "this is not valid"
        })
    }
}

app.listen(3000 , ()=>{
    console.log("server is running");
})