const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();
const {UsersModel} = require('../models/users.models')
const {checkUser} = require('../middleware/checkUser.middleware')
const usersRoute = express.Router();



usersRoute.post('/login',async(req,res)=>{
    const{email,password,userID} = req.body;
    try{
        const user = await UsersModel.find({email});
        if(user.length==1){
            bcrypt.compare(password,user[0].password,async(err,result)=>{
                if(result){
                    const token = jsonwebtoken.sign({userID:user[0]._id},process.env.key,{expiresIn:'2hr'})
                    res.send({'msg':user[0]._id,'token' : token})
                }else{
                    res.send('Wrong Credentials')
                }
            })
        }
    }catch{
        res.send('Error in login')
    }
})







usersRoute.use(checkUser);
usersRoute.post('/register',(req,res)=>{
    const{name,email,gender,password,age,city} =req.body;
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send('Error in encrypting the Password');
            }else{
                const user = new UsersModel({name,email,gender,password:hash,age,city});
                const data = await user.save();
                res.send(data);
            }
        })
    }catch{
        res.send('Error while registration');
    }
})


module.exports = {usersRoute}