const express = require('express');
require('dotenv').config();
const {PostModel} = require('../models/posts.models')
const postsRoute = express.Router();



postsRoute.post('/create',async(req,res)=>{
    const data = req.body;
    try{
        const post = new PostModel(data);
        const newData = await post.save();
        res.send(newData)
    }catch{
        res.send('Error in posting a Post')
    }
})


postsRoute.get('/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const data = await PostModel.find({userID:id});
        res.send(data);
    }catch{
        res.send('Error in finding the data of the user.')
    }
})

postsRoute.get('/',async(req,res)=>{
    const device = req.query;
    try{
        const data = await PostModel.find(device)
        res.send(data);
    }catch{
        res.send('Error in searching the desired Data')
    }
})

postsRoute.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        await PostModel.findByIdAndDelete({_id:id});
        res.send('Post has been deleted')
    }catch{
        res.send('Error in deleting the Post')
    }
})

postsRoute.patch('/update/:id',async(req,res)=>{
    const id = req.params.id;
    const data = req.body;
    try{
        const updateData = await PostModel.findByIdAndUpdate({_id:id},data);
        res.send(updateData);
    }catch{
        res.send('Error in updating the Post.')
    }
})



module.exports = {postsRoute}