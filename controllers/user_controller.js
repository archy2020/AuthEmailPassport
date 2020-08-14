const User = require('../models/user');
module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('user_profile',{
                    title : "user_profile",
                    user : user
                })
            }
            else{
                return res.redirect('/user/sign-in');
            }
           
        });
    }
            else{
                return res.redirect('/user/sign-in');
            }
}
// render the sign up and sign in page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title : "Email Auth| sign up"
    })
}

module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title : "Email Auth| sign in"
    })
}

//get data from sign up pages

module.exports.create = function(req,res){

    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
        }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user in signing up');return;}

        if(!user){
            User.create(req.body , function(err, User){
                if(err){console.log('Error in creating user while signing up');return;}

                return res.redirect('/user/sign-in')
            })
        }else{
            return res.redirect('back');
        }
    }) ;   
}

module.exports.createSession = function(req,res){

    //find the user

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user in signing up');return;}

    //handle user found
     if(user){
        if(user.password != req.body.password){
            return res.redirect('back');
            }

    // handle password which doenot match

     res.cookie('user_id',user.id);
     return res.redirect('/user/profile');

    // handle session creation
     
    } else{
        return res.redirect('back');
    }   
    // handle user not found
});
}
