const express = require('express')
const router = express.Router()
const {
  createProduct, getAllStoreProducts, deleteProduct, getAllProducts, createProductReview
} = require('../controllers/productController')

const multer = require('multer');

const storage = multer.diskStorage({
  filename: function (req,file,cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage,limits:{fieldSize: 25 * 1024 * 1024} });


router.get('/', getAllProducts )
router.get('/:id', getAllStoreProducts )
router.post('/create-product',  upload.array("images"), createProduct)
router.delete('/:id', deleteProduct )
router.put('/create-product-review', createProductReview )


module.exports = router
