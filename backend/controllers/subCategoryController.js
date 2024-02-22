
// const mongoose = require('mongoose');
// const MainCategory = require('../models/mainCategoryModel');
// const SubCategory = require('../models/subCategoryModel');


// const createSubCategory = async (req, res) => {
//     console.log(req.body);
//     try {
//         const { name, mainCategory } = req.body;
//         console.log("Received mainCategory:", mainCategory);

//         // Check if mainCategory is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(mainCategory)) {
//             return res.status(400).json({ error: 'Invalid mainCategory' });
//         }

//         // Check if the mainCategory with the provided mainCategory exists
//         const existingMainCategory = await MainCategory.findById(mainCategory);
//         if (!existingMainCategory) {
//             return res.status(404).json({ error: 'Main category not found' });
//         }

//         // Create a new subcategory
//         const subcategory = new SubCategory({
//             name,
//             mainCategory: mongoose.Types.ObjectId(mainCategory),
    
//         });
//         const savedSubCategory = await subcategory.save();
//         res.status(201).json(savedSubCategory);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


// const getSubCategories = async (req, res) => {
//     try {
//       const { categoryId } = req.query;
//     //   console.log(categoryId)
//       let subcategories = [];
  
//       if (categoryId) {
//         const categoryIdObjectId = mongoose.Types.ObjectId(categoryId);
//         subcategories = await SubCategory.find({ mainCategory: categoryIdObjectId });
//       } else {
//         subcategories = await SubCategory.find();
//       }
  
//       res.status(200).json({ subcategories });
//     } catch (error) {
//       console.error('Error fetching subcategories:', error);
//       res.status(500).json({ msg: 'Internal Server Error' });
//     }
//   };
  

// // Get a single subcategory by ID
// const getSubCategoryById = async (req, res) => {
//     try {
//         const subcategoryId = req.params.id;
//         const subcategory = await SubCategory.findById(subcategoryId);
//         if (!subcategory) {
//             return res.status(404).json({ error: 'Subcategory not found' });
//         }
//         res.status(200).json(subcategory);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// // Update a subcategory by ID
// const updateSubCategory = async (req, res) => {
//     try {
//         const subcategoryId = req.params.id;
//         const { name, mainCategory } = req.body; // Changed categoryId to mainCategory
//         const updatedSubCategory = await SubCategory.findByIdAndUpdate(
//             subcategoryId,
//             { name, mainCategory }, // Changed category to mainCategory
//             { new: true }
//         );
//         if (!updatedSubCategory) {
//             return res.status(404).json({ error: 'Subcategory not found' });
//         }
//         res.status(200).json(updatedSubCategory);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// // Delete a subcategory by ID
// const deleteSubCategory = async (req, res) => {
//     try {
//         const subcategoryId = req.params.id;
//         const deletedSubCategory = await SubCategory.findByIdAndDelete(subcategoryId);
//         if (!deletedSubCategory) {
//             return res.status(404).json({ error: 'Subcategory not found' });
//         }
//         res.status(204).end();
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


// module.exports = {
//     createSubCategory,
//     getSubCategories,
//     getSubCategoryById,
//     updateSubCategory,
//     deleteSubCategory
//   };
  

const mongoose = require('mongoose');
const MainCategory = require("../models/mainCategory");
const SubCategory = require('../models/subCategory');

const createSubCategory = async (req, res) => {
    try {
        const { name, mainCategory } = req.body;

        if (!mongoose.Types.ObjectId.isValid(mainCategory)) {
            return res.status(400).json({ error: 'Invalid mainCategory' });
        }

        const existingMainCategory = await MainCategory.findById(mainCategory);
        if (!existingMainCategory) {
            return res.status(404).json({ error: 'Main category not found' });
        }

        const subcategory = new SubCategory({
            name,
            mainCategory: mongoose.Types.ObjectId(mainCategory)
        });
        const savedSubCategory = await subcategory.save();

        // Update the subcategories array in the corresponding main category document
        existingMainCategory.subcategories.push(savedSubCategory._id);
        await existingMainCategory.save();

        res.status(201).json(savedSubCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getSubCategories = async (req, res) => {
    try {
        const { categoryId } = req.query;
        let subcategories = [];

        if (categoryId) {
            const categoryIdObjectId = mongoose.Types.ObjectId(categoryId);
            subcategories = await SubCategory.find({ mainCategory: categoryIdObjectId }).populate('subsubcategories');
        } else {
            subcategories = await SubCategory.find().populate('subsubcategories');
        }

        res.status(200).json(subcategories);
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const getSubCategoryById = async (req, res) => {
    try {
        const subcategoryId = req.params.id;
        const subcategory = await SubCategory.findById(subcategoryId);
        if (!subcategory) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }
        res.status(200).json(subcategory);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateSubCategory = async (req, res) => {
    try {
        const subcategoryId = req.params.id;
        const { name, mainCategory } = req.body;
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            subcategoryId,
            { name, mainCategory },
            { new: true }
        );
        if (!updatedSubCategory) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }
        res.status(200).json(updatedSubCategory);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteSubCategory = async (req, res) => {
    try {
        const subcategoryId = req.params.id;
        const deletedSubCategory = await SubCategory.findByIdAndDelete(subcategoryId);
        if (!deletedSubCategory) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createSubCategory,
    getSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory
};
