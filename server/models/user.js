const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please provide a username"]
    },
    email: {
        type: String,
        required: [true, "please provide a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true,"please add apassword"],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

UserSchema.methods.matchpasswords = async function(password){
    return await bcrypt.compare(password,this.password);
}

const User = mongoose.model("User",UserSchema);

module.exports = User;