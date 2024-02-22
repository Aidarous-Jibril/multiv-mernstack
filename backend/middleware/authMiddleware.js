const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Store = require('../models/storeModel')

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const {user_token} = req.cookies;

    if(!user_token){
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(user_token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
})



const isSeller = asyncHandler(async(req, res, next) => {
  console.log("COOKIES", req.cookies)
  const {store_token } = req.cookies;
  if(!store_token){
    res.status(401)
    throw new Error('Not authorized, no Store token')
  }

  const decoded = jwt.verify(store_token, process.env.JWT_SECRET)

  // Get store/seller from the store_token
  req.store = await Store.findById(decoded.id);

  next();
});

module.exports = { isAuthenticated, isSeller }
