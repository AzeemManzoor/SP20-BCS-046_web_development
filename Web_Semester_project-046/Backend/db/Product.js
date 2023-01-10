const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The user must have a name"]}, 
    price:{type:String,required: [true, "Price must be enter"]},
    category:String,
    userId:String,
    company: {
        type: String,
        required: [true, "Company name must be enter"]},
});

module.exports= mongoose.model("products",productSchema);

