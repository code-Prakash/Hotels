const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    taste:{
        type: String,
        enum: ['spicy', 'sweet', 'sour', 'bitter', 'salty', 'umami']
    },
    is_drink:{
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales:{
        type: Number,
        default: 0
    }
})

//Create menu model
const Menu = mongoose.model('Menu',menuItemSchema);
module.exports = Menu;