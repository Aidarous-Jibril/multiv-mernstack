const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your event product name"],
    },
    description: {
      type: String,
      required: [true, "Please enter your event product description"],
    },
    mainCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory' },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
    subSubCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubSubCategory' },
    // category: {
    //   type: String,
    //   required: [true, "Please enter your event product category"],
    // },
    brand: {
      type: String,
      required: [true, "Please enter product brand"],
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
      required: [true, "Please enter your event product original Price"],
    },
    discountPrice: {
      type: String,
      required: [true, "Please enter your event product discount Price"],
    },
    stock: {
      type: String,
      required: [true, "Please enter your event product stock number"],
    },
    start_Date: {
      type: Date,
      required: true,
    },
    finish_Date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "Running",
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
    storeId: {
      type: String,
      required: true,
    },
    store: {
      type: Object,
      required: true,
    },
    sold_out: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
