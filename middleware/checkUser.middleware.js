const {UsersModel} = require('../models/users.models');



const checkUser = async(req,res,next) => {
    const {email} = req.body;
    try{
        const user = await UsersModel.find({email});
        if(user.length==0){
            next();
        }else{
            res.send('User already exist, please login')
        }
    }catch{
        res.send('Something went Wrong!')
    }
}


module.exports = {checkUser};