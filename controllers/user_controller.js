const User = require('../models/user');

module.exports.profile = function(req,res){
    //res.end('<h1>User Profile</h1>');

    return res.render('user_profile',{
        title: "User profile"
    })
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
