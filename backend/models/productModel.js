const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [ "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [ "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0
  },
  images: [
    {
      public_id: {
        type: String,
        
      },
      url: {
        type: String,
        
      },
    },
  ],
  category: {
    type: String,
    required: [ "Please Enter Product Category"],
  },
  size:{
    type: String,
  },
  Stock: {
    type: Number,
    required: [ "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1     
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required:true,
        
      },
      name: {
        type: String,
       
      },
      rating: {
        type: Number,
         
      },
      comment: {
        type: String,
        
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required:true,
   
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Product", productSchema);