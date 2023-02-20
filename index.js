const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {connection} = require('./configs/connection')
const {usersRoute} = require('./routes/users.routes');
const {postsRoute} = require('./routes/posts.routes');
const {authentication} = require('./middleware/authenticate.middleware');


const app = express();
app.use(express.json());
app.use(cors());


app.use('/users',usersRoute);



app.get('/',(req,res)=>{
    res.send('Welcome to the Homepage')
})


app.use(authentication);
app.use('/posts',postsRoute);
app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("Connected to the Database");
    }catch{
        console.log("Error while connecting to the Database");
    }
    console.log(`Server is running at the port:${process.env.port}`);
})