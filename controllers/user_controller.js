const User = require('../models/user');

module.exports.profile = function(req,res){
 User.findById(req.params.id, function(err, user){

    return res.render('user_profile',{
    title: "User profile",
    profile_user : user

   });
    
 });
}
// commented to convert into async await for avatar
// module.exports.update = function(req,res){
//     if(req.user.id == req.params.id){

//         User.findByIdAndUpdate(req.params.id, req.body , function(err,user){
//             return res.redirect('back');
//         });
//     } else {
//         return res.status(401).send('Unauthorized');
//     }
//    }

module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uplodedAvatar(req,res,function(err){
                if(err){console.log('*****Muter error',err);}
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    //this is saving the path of the uploaded file in avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();
                return res.redirect('back');

            });
        }catch(err){
           
            req.flash('error', err);
            return res.redirect('back');

        }
    } else {

        req.flash('error','unaothorized');
        return res.status(401).send('Unauthorized');
    }
   }
// render the sign up and sign in page
module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
       return res.redirect('/user/profile')
    }
    return res.render('user_sign_up',{
        title : "Email Auth| sign up"
    })
}

module.exports.signIn = function(req,res){

    
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }
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
            User.create(req.body , function(err, user){
                if(err){console.log('Error in creating user while signing up');return;}

                return res.redirect('/user/sign-in')
            })
        }else{
            return res.redirect('back');
        }
    }) ;   
}

//sign in and create a session for the user
module.exports.createSession = function(req,res){
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success', 'Logged out successfully!!!');
    return res.redirect('/');
}

