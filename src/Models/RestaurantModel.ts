import mongoose from "mongoose";

// MenuItems
const MenuItemSchema = new mongoose.Schema({
    foodName: {
        type: String,
    },
    foodPrice: {
        type: Number,
    },
    // foodImage: {
    //     type: String,
    // }
})

// Restaurant
const RestaurantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    restaurantName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    deliveryPrice: {
        type: Number,
        required: true
    },
    estimatedDeliveryTime: {
        type: Number,
        required: true
    },
    cuisines: [{
        type: String,
        required: true
    }],
    imageUrl: {
        type: String,
        // required: true
    },
    menuItems: [MenuItemSchema],
    lastUpdated: {
        type: Date,
        required: true
    }
}, { timestamps: true })

const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);

export default RestaurantModel;