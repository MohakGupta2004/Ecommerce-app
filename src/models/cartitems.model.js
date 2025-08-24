import mongoose from "mongoose";

const cartItemsSchema=new mongoose.Schema({
    cart_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'cart',
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export const CartItems = new mongoose.model("CartItems", cartItemsSchema)

