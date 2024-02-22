const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name']
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    mainCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory' },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
    subSubCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubSubCategory' },
    brand: {
        type: String,
        required: [true, 'Please enter product brand'],
    },
    model: {
        type: String,
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    originalPrice: {
        type: String,
        required: [true, 'Please enter product original Price'],
    },
    discountPrice: {
        type: String,
        required: [true, 'Please enter product discount Price'],
    },
    stock: {
        type: String,
        required: [true, 'Please enter product stock number'],
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    reviews: [
        {
            user: {
                type: Object,
            },
            rating: {
                type: Number,
            },
            comment: {
                type: String,
            },
            productId: {
                type: String,
            },
            createdAt:{
                type: Date,
                default: Date.now(),
            }
        },
    ],
    rating: {
        type: Number,
    },
    storeId: {
        type: String,
        required: true
    },
    store: {
        type: Object,
        required: true
    },
    sold_out: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)
