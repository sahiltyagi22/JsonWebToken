const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()


app.get('/' , (req,res)=>{
    res.send("yes its working")
})


app.listen(3000 , ()=>{
    console.log("server is running");
})