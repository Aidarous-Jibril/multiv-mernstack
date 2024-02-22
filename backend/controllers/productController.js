const Product = require("../models/productModel");
const Store = require("../models/storeModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("../utils/cloudinary");
const SubCategory = require("../models/subCategory");
const SubSubCategory = require("../models/subSubCategory");
const MainCategory = require("../models/mainCategory");

// const createProduct = catchAsyncErrors(async (req, res, next) => {
//     const { category, subcategory, subSubcategory } = req.body;
//     console.log(category, subcategory, subSubcategory)
//     const images = req.files.map((file) => file.path);

//     try {
//         const storeId = req.body.storeId;
//         const store = await Store.findById(storeId);
//         if (!store) {
//             return res.status(400).json({ message: "Store Id is invalid!" });
//         } else {
//             let images = [];

//             if (typeof req.body.images === "string") {
//                 images.push(req.body.images);
//             } else {
//                 images = req.body.images;
//             }

//             const imagesLinks = [];

//             for (let i = 0; i < images.length; i++) {
//                 const result = await cloudinary.uploader.upload(images[i], {
//                     folder: "products",
//                 });
//                 imagesLinks.push({
//                     public_id: result.public_id,
//                     url: result.secure_url,
//                 });
//             }

//             const existingMainCategory = await MainCategory.findById(category);
//             const existingSubCategory = await SubCategory.findById(subcategory);
//             const existingSubSubCategory = await SubSubCategory.findById(subSubcategory);

//             if (!existingMainCategory || !existingSubCategory || !existingSubSubCategory) {
//                 return res.status(400).json({ message: "Invalid category, subcategory, or child category ID" });
//             }

//             const productData = {
//                 name: req.body.name, 
//                 description: req.body.description, 
//                 mainCategory: existingMainCategory, 
//                 subCategory: existingSubCategory, 
//                 subSubCategory: existingSubSubCategory, 
//                 tags: req.body.tags, 
//                 originalPrice: req.body.originalPrice, 
//                 discountPrice: req.body.discountPrice, 
//                 stock: req.body.stock, 
//                 storeId: storeId, 
//                 store: store, 
//                 images: imagesLinks
//             };

//             const product = await Product.create(productData);

//             res.status(201).json({
//                 success: true,
//                 product,
//             });
//         }
//     } catch (error) {
//         return res.status(400).json(error);
//     }
// });

const createProduct = catchAsyncErrors(async (req, res, next) => {
  const { category, subcategory, subSubcategory, brand, model, size, color } = req.body;
  console.log(category, subcategory, subSubcategory)
  const images = req.files.map((file) => file.path);

  try {
      const storeId = req.body.storeId;
      const store = await Store.findById(storeId);
      if (!store) {
          return res.status(400).json({ message: "Store Id is invalid!" });
      } else {
          let images = [];

          if (typeof req.body.images === "string") {
              images.push(req.body.images);
          } else {
              images = req.body.images;
          }

          const imagesLinks = [];

          for (let i = 0; i < images.length; i++) {
              const result = await cloudinary.uploader.upload(images[i], {
                  folder: "products",
              });
              imagesLinks.push({
                  public_id: result.public_id,
                  url: result.secure_url,
              });
          }

          const existingMainCategory = await MainCategory.findById(category);
          const existingSubCategory = await SubCategory.findById(subcategory);
          const existingSubSubCategory = await SubSubCategory.findById(subSubcategory);

          if (!existingMainCategory || !existingSubCategory || !existingSubSubCategory) {
              return res.status(400).json({ message: "Invalid category, subcategory, or child category ID" });
          }

          const productData = {
              name: req.body.name, 
              description: req.body.description, 
              mainCategory: existingMainCategory, 
              subCategory: existingSubCategory, 
              subSubCategory: existingSubSubCategory, 
              brand: brand,
              model: model,
              size: size,
              color: color,
              originalPrice: req.body.originalPrice, 
              discountPrice: req.body.discountPrice, 
              stock: req.body.stock, 
              storeId: storeId, 
              store: store, 
              images: imagesLinks
          };

          const product = await Product.create(productData);

          res.status(201).json({
              success: true,
              product,
          });
      }
  } catch (error) {
      return res.status(400).json(error);
  }
});

const getAllStoreProducts = catchAsyncErrors(async (req, res) => {
    try {
        const products = await Product.find({ storeId: req.params.id });

        res.status(201).json({
            success: true,
            products,
        });
    } catch (error) {
        return res.status(400).json(error);
    }
});

const deleteProduct = catchAsyncErrors(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.remove();
        }
        res.status(201).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        throw new Error("Product not found");
    }
});

const getAllProducts = catchAsyncErrors(async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.status(201).json({
            success: true,
            products
        });
    } catch (error) {
        return res.status(400).json(error);
    }
});

const createProductReview = catchAsyncErrors(async (req, res) => {
    const { user, rating, comment, productId, orderId } = req.body;

    if (!rating) {
        return res.status(400).json({ message: 'Rating is needed'});
    }

    const product = await Product.findById(productId);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user._id.toString() === user._id.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({ msg: 'Product already reviewed'});
        }

        const review = {
            user,
            rating: Number(rating),
            comment,
            productId
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        //get average of all rating
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        return res.status(201).json({success: true,  msg: 'Product is reviewed successfully' });
    } else {
        return res.status(404).json({ message: 'Product nor found'});
    }
});

module.exports = {
    createProduct,
    getAllStoreProducts,
    deleteProduct,
    getAllProducts,
    createProductReview
};
