const CouponCode = require("../models/couponCodeModel");
const Product = require("../models/productModel");
const Store = require("../models/storeModel");

//Create new product
const createCouponCode = async (req, res, next) => {
  console.log("SERVER DATA", req.body);
  try {
    const isCoupounCodeExists = await CouponCode.find({
      name: req.body.name,
    });

    if (isCoupounCodeExists.length !== 0) {
      return res.status(400).json({message: "Coupon Code already exists!"})
    }

    const couponCode = await CouponCode.create(req.body);

    res.status(201).json({
      success: true,
      couponCode,
    });
  } catch (error) {
    return res.status(400).json(error)
  }
};


// get all products of a store
const getAllCouponCodes = async (req, res) => {
  try {
    const coupons = await CouponCode.find({ storeId: req.params.id });
    // console.log(products)

    res.status(201).json({
      success: true,
      coupons,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

// delete coupon code
const deleteCouponCode = async (req, res) => {
  try {
    // const product = await Product.findByIdAndDelete(req.params.id );
    const coupon = await CouponCode.findById(req.params.id);
    console.log(coupon);
    if (coupon) {
      await coupon.remove();
    }
    res.status(201).json({
      success: true,
      message: "Coupon code deleted successfully",
    });
  } catch (error) {
    throw new Error("Coupon code not found");
  }
};

// get coupon code value
const getCouponCodeValue = async (req, res) => {
  console.log(req.params)
  try {
    // const couponCode = await CouponCode.findOne({name: req.body.name})
    const couponCode = await CouponCode.findOne({ name: req.params.name });
    
    res.status(201).json({
      success: true,
      couponCode,
      message: "Coupon code fetched successfully",
    });
  } catch (error) {
    res.status(400).json({msg: "Coupon code not found!"})
  }
}


module.exports = {
  createCouponCode,
  getAllCouponCodes,
  deleteCouponCode,
  getCouponCodeValue
};
