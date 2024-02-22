// // create token and saving that in cookies
// const sendStoreToken = (user, statusCode, res) => {
//     const token = user.getJwtToken();
  
//     // Options for cookies
//     const options = {
//       expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
//       httpOnly: true,
//       sameSite: "none",
//       secure: true,
//     };
  
//     res.status(statusCode).cookie("seller_token", token, options).json({
//       success: true,
//       user,
//       token,
//     });
//   };
  
//   module.exports = sendStoreToken;

const jwt = require('jsonwebtoken')

const createStoreToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });

   // Set JWT as an HTTP-Only cookie
   res.cookie('store_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

module.exports = createStoreToken;