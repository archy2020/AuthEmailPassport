const Post = require('../models/post');

module.exports.home = function(req,res){

//     post.find({}, function(err,post){
//     return res.render('home',{
//         title :"Email Authorization | home",
//         post : post
//     });
// });

Post.find({}).populate('user').exec(function(err,posts){
    return res.render('home',{
        title :"Email Authorization | home",
        posts : posts
    });
}) 
}