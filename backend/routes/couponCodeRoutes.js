const express = require('express')
const router = express.Router()
const {
  createCouponCode,
  getAllCouponCodes,
  deleteCouponCode,
  getCouponCodeValue
} = require('../controllers/couponCodeController')
const { isSeller } = require('../middleware/authMiddleware')



router.post('/create-coupon-code', isSeller, createCouponCode)
router.get('/:id', getAllCouponCodes )
router.get("/get-coupon-value/:name", getCouponCodeValue)
router.delete('/:id', deleteCouponCode )


module.exports = router
