var mongoose = require("mongoose");
 
var ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        // required:true
    },
    image: {
        type: String,
        // required:true
    },
    description: {
        type: String,
        // required: true,
        
    },
    price: {
        type: Number,
        // required:false
    },
    category: {
        type:String
    }
});
 
module.exports = mongoose.model("Product", ProductsSchema);