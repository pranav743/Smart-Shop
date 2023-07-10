const mongoose = require("mongoose")


const reviewSchema = new mongoose.Schema({
    rating: {
      type: Number,
      required: true,
      integer: true,
      min: 0,
      max: 10
    },
    comment: {
      type: String,
      required: true,
      maxlength: [500, "Max length is 500"]
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Reviewer ObjectID is Missing"]
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, "Product ObjectID is Missing"]
    },
    date: {
        type: Date,
        default: Date.now
    }
  });

const productSchema = new mongoose.Schema({
    slug: String,
    price: {
        actual_price: {
            required: [true, "Add the actual Price"],
            type: Number,
            min: 1
        },
        discount: {
            required: false,
            type: Number,
            default: 0
        }
    },
    category: {
        broad_category: {
            required: [true, "Add a broad Category"], // Electronics, Fashion, Home&Kitchen, Beauty&Personel care, Sports&Outdoors
            type: String,
            enum: ['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty & Personal Care', 'Sports & Outdoors']
        },
        sub_category: {
            required: false,
            type: String
        }
    },
    details: {
        brand: {
            type: String,
            required: [true, "Enter the Brand/Company"]
        },
        available_quantity: {
            type: Number,
            integer: true,
            required: [true, "Enter Quantity"],
            min: 1,
        },
        country_of_origin:{
            required: [true, "Enter Country of Origin"],
            type: String
        },
        material: {
            type: String,
            required: false,
            default: null
        },
        isReturnable: {
            type: Boolean,
            required: false,
            default: false
        },
        imgs: {
            type: [String],
            required: [true, "At least one Image is required"],
        },
        description: {
            type: String,
            maxlength: [700, "Product Description should not exceed 700 characters"],
            required: [true, "Product Description should not be empty"]
        }    
    },
    reviews: [reviewSchema]
})

const Product = mongoose.model("product", productSchema);