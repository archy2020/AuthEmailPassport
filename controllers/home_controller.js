const User = require('../models/user');
const Post = require('../models/post');


module.exports.home = async function(req,res){

 try{
    //populate the user of each post
   let posts = await Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    });
    
        
    let users = await    User.find({});

            return res.render('home', {
                title :"Email Authorization | home",
                posts : posts,
                all_users : users
            });
        } catch(err){
            console.log('Error',err);
            return;
        }
    }       
// module.exports.home = function(req,res){
// Post.find({})
// .populate('user')
// .populate({
//     path : 'comments',
//     populate : {
//         path : 'user'
//     }
// })
// .exec(function(err,posts){
    
//     User.find({}, function(err, user){
//         return res.render('home', {
//             title :"Email Authorization | home",
//             posts : posts,
//             all_users : user
//         });
//     });
// })
// }