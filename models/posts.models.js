const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
  "title":String,
  "body":String,
  "device":String,
  "no_if_comments":String,
  "userID":String
},{
    versionKey:false
});


const PostModel =mongoose.model("posts",postsSchema);

module.exports = {PostModel};
