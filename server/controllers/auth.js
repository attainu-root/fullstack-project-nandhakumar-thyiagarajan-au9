const User = require('../models/user')


exports.register = async (req, res, next) => {
    const {username, email, password} = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password,
        });

        res.status(201).json({
            success: true,
            user,
        });

    }catch(error){
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.satus(400).json({ success: false, error: "please provide email and password"});
      }
    
      try{
          const user = await User.findone({email}).select("+password");

          if(!user){
            res.satus(400).json({ success: false, error: "invalid credentials"
          }
        }
          const isMatch = await user.matchpasswords(password);

          if (!isMatch) {
            res.satus(400).json({ success: false, error: "invalid credentials"}
        }

        res.status(200).json({
            sucess: true,
            token:"coiffuifnuinu",
        });
      }catch(error){
          res.status(500).json({success:false, error: error.message})
      }
}

exports.forgotpassword =(req, res, next) => {
    res.send('forgetpassword route');
}

exports.resetpassword =(req, res, next) => {
    res.send('resetpassword route');
}