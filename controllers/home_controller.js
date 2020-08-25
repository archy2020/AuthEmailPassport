const User = require('../models/user');
const Post = require('../models/post');

module.exports.home = function(req,res){

//     post.find({}, function(err,post){
//     return res.render('home',{
//         title :"Email Authorization | home",
//         post : post
//     });
// });

Post.find({})
.populate('user')
.populate({
    path : 'comments',
    populate : {
        path : 'user'
    }
})
.exec(function(err,posts){
    
    User.find({}, function(err, user){
        return res.render('home', {
            title :"Email Authorization | home",
            posts : posts,
            all_users : user
        });
    });
})
}