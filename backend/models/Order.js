const mongoose= require ("mongoose");

const orderItemSchema = new  mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity:{
        type: Number,
        required:true,
        min:1
    },
    price:{
        type:Number,
        required:true,
        min:0
    }
});

const orderSchema =new mongoose.Schema(
    {
        items:{
            type:[orderItemSchema],
            required: true
        },
        totalAmount:{
            type:Number,
            required:true,
            min:0
        },

        paymentMethod:{
        type: String,
        enum: ["cash","mpesa","card"],
        required: true

        },
        status: {
            type: String,
            enum: ["pending","completed","cancelled"],
            default:"completed"
        }

    },
    {
        timestamps :true
    }
);

module.exports = mongoose.model("order",orderSchema)