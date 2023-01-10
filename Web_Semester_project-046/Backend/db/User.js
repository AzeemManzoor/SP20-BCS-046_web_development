const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
// const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The user must have a name"]},
    email: {
        type: String,
        required: [true, "User must have an email address"],
        match: /.+\@.+\..+/ ,
        unique: [true, "User exist with the same email already"],
      }, 
      password: {
        type: String,
        minlength: [8, "Password must have at least 8 characters"],
        required: [true, "The use must have password"],
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        
        // message:
        //   "Password must contain at least one uppercase letter, one lowercase letter, and one number and one special chracter"
      }
});



module.exports= mongoose.model("users",userSchema);

