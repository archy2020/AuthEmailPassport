const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post, function(err,post){
       if(Post){
        Comment.create({
            content : req.body.content,
            post : req.body.post,
            user : req.user._id // yaha kya kiya modify?
        }, function(err,comment){

            post.comments.push(comment);
            post.save();
            res.redirect('back'); 
        });
       }
  });//finally;)
}


module.exports.destroy = function(req,res){
    Comment.findById(req.params.id, function(err, comment){
        //.id means converting the object id into string
        if (comment.user == req.user.id){

            let postId = comment.post;
            comment.remove();
            
            Post.findByIdAndUpdate(postId , {$pull: {comments : req.params.id}}, function(err,post){
               return res.redirect('back');
            });

        } else {
            return res.redirect('back');
        }
    });
}

// not getting this will esclate this some one else will help u out
// user field is not getting created in db.. y? in comment u see? seen?
