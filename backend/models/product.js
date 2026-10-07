const mongoose= require("mongoose");

const productSchema = new mongoose.Schema(
    {
      name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true    

      },
      barcode:{
        type:String,
        unique:true,
        sparse:true,
        trim:true
      },
      category:{
        type:String,
        required: true,
        trim:true
      },
      price:{
        type:Number,
        required: true,
        min:[0,"Price cannot be negative"]
      },
      costPrice:{
        type:Number,
        required: true,
        min:[0,"Cost price cannot be negative"]
      },
      quantity:{
        type:Number,
        required: true,
        default:0,
        min:[0,"Quantity cannot be negative"]
      },
      lowStockThreshold:{
        type:Number,
        required: true,
        default:5,
      }

    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("product",productSchema);