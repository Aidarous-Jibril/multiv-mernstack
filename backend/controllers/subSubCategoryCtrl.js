// const mongoose = require('mongoose');
// const SubCategory = require('../models/subCategoryModel');
// const SubSubCategory = require('../models/subSubCategoryModel');

// // Add new sub-subcategory
// const createSubSubcategory = async (req, res) => {
//     console.log(req.body);
//     try {
//         const { name, subCategory } = req.body;
//         console.log("Received subCategory:", subCategory);

//         if (!mongoose.Types.ObjectId.isValid(subCategory)) {
//             return res.status(400).json({ error: 'Invalid SubCategory' });
//         }

//         const existingSubCategory = await SubCategory.findById(subCategory);
//         if (!existingSubCategory) {
//             return res.status(404).json({ error: 'Subcategory not found' });
//         }

//         const subSubCategory = new SubSubCategory({ 
//             name,
//             subCategory: mongoose.Types.ObjectId(subCategory) 
//         });
//         const savedSubSubCategory = await subSubCategory.save();
//         res.status(201).json(savedSubSubCategory);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// // Get all sub-subcategories
// const getAllSubSubcategories = async (req, res) => {
//     try {
//         const { subcategoryId } = req.query;
//         let subSubcategories = [];
    
//         if (subcategoryId) {
//             const subcategoryIdObjectId = mongoose.Types.ObjectId(subcategoryId);
//             subSubcategories = await SubSubCategory.find({ subCategory: subcategoryIdObjectId });
//         } else {
//             subSubcategories = await SubSubCategory.find();
//         }
    
//         res.status(200).json({ subSubcategories });
//     } catch (error) {
//         console.error('Error fetching sub-subcategories:', error);
//         res.status(500).json({ msg: 'Internal Server Error' });
//     }
// };
    

// // Get sub-subcategory by ID
// const getSubSubcategoryById = async (req, res) => {
//     try {
//         const subcategoryId = req.params.id;
//         const subSubcategory = await SubSubCategory.findById(subcategoryId);
//         if (!subSubcategory) {
//             return res.status(404).json({ error: 'Subsubcategory not found' });
//         }
//         res.status(200).json(subSubcategory);
//     } catch (error) {
//         console.error("Error fetching sub-subcategories:", error);
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// };

// // Delete a sub-subcategory by ID
// const deleteSubSubCategory = async (req, res) => {
//     try {
//         const subSubcategoryId = req.params.id;
//         const deletedSubSubCategory = await SubSubCategory.findByIdAndDelete(subSubcategoryId);
//         if (!deletedSubSubCategory) {
//             return res.status(404).json({ error: "Sub-subcategory not found" });
//         }
//         res.status(204).end();
//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// module.exports = {
//     createSubSubcategory,
//     getAllSubSubcategories,
//     getSubSubcategoryById,
//     deleteSubSubCategory,
// };



const mongoose = require('mongoose');
const SubCategory = require('../models/subCategory');
const SubSubCategory = require('../models/subSubCategory');

// Create a new sub-subcategory
const createSubSubcategory = async (req, res) => {
    try {
        const { name, subCategory } = req.body;

        if (!mongoose.Types.ObjectId.isValid(subCategory)) {
            return res.status(400).json({ error: 'Invalid SubCategory' });
        }

        const existingSubCategory = await SubCategory.findById(subCategory);
        if (!existingSubCategory) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }

        const subSubCategory = new SubSubCategory({ 
            name,
            subCategory: mongoose.Types.ObjectId(subCategory) 
        });
        const savedSubSubCategory = await subSubCategory.save();

        // Update the subsubcategories array in the corresponding subcategory document
        existingSubCategory.subsubcategories.push(savedSubSubCategory._id);
        await existingSubCategory.save();

        res.status(201).json(savedSubSubCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all sub-subcategories
const getAllSubSubcategories = async (req, res) => {
    try {
        const { subcategoryId } = req.query;
        let subSubcategories = [];
    
        if (subcategoryId) {
            const subcategoryIdObjectId = mongoose.Types.ObjectId(subcategoryId);
            subSubcategories = await SubSubCategory.find({ subCategory: subcategoryIdObjectId });
        } else {
            subSubcategories = await SubSubCategory.find();
        }
    
        res.status(200).json({ subSubcategories });
    } catch (error) {
        console.error('Error fetching sub-subcategories:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Get sub-subcategory by ID
const getSubSubcategoryById = async (req, res) => {
    try {
        const subSubcategoryId = req.params.id;
        const subSubcategory = await SubSubCategory.findById(subSubcategoryId);
        if (!subSubcategory) {
            return res.status(404).json({ error: 'Sub-subcategory not found' });
        }
        res.status(200).json(subSubcategory);
    } catch (error) {
        console.error("Error fetching sub-subcategories:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Delete a sub-subcategory by ID
const deleteSubSubCategory = async (req, res) => {
    try {
        const subSubcategoryId = req.params.id;
        const deletedSubSubCategory = await SubSubCategory.findByIdAndDelete(subSubcategoryId);
        if (!deletedSubSubCategory) {
            return res.status(404).json({ error: "Sub-subcategory not found" });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createSubSubcategory,
    getAllSubSubcategories,
    getSubSubcategoryById,
    deleteSubSubCategory,
};
