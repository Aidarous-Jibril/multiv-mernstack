// const MainCategory = require("../models/mainCategoryModel");



// // Create a new category
// const createCategory = async (req, res) => {
//     try {
//         const { name } = req.body;
//         const category = new MainCategory({ name });
//         const savedCategory = await category.save();
//         res.status(201).json(savedCategory);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// // Get all categories
// const getCategories = async (req, res) => {
//     try {
//         const categories = await MainCategory.find();
//         // console.log(categories)
//         res.status(200).json(categories);
//     } catch (error) {
//         res.status(500).json({ msg: 'Internal Server Error' });
//     }
// };

// // Get a single category by ID
// const getCategoryById = async (req, res) => {
//     try {
//         const categoryId = req.params.id;
//         const category = await MainCategory.findById(categoryId);
//         if (!category) {
//             return res.status(404).json({ error: 'Category not found' });
//         }
//         res.status(200).json(category);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// // Update a category by ID
// const updateCategory = async (req, res) => {
//     try {
//         const categoryId = req.params.id;
//         const { name } = req.body;
//         const updatedCategory = await MainCategory.findByIdAndUpdate(
//             categoryId,
//             { name },
//             { new: true }
//         );
//         if (!updatedCategory) {
//             return res.status(404).json({ error: 'Category not found' });
//         }
//         res.status(200).json(updatedCategory);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// // Delete a category by ID
// const deleteCategory = async (req, res) => {
//     try {
//         const categoryId = req.params.id;
//         const deletedCategory = await MainCategory.findByIdAndDelete(categoryId);
//         if (!deletedCategory) {
//             return res.status(404).json({ error: 'Category not found' });
//         }
//         res.status(204).end();
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// module.exports = {
//     createCategory,
//     getCategories,
//     getCategoryById,
//     updateCategory,
//     deleteCategory
// };

// mainCategoryController.js
const MainCategory = require("../models/mainCategory");

// Create a new category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = new MainCategory({ name });
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await MainCategory.find().populate('subcategories');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await MainCategory.findById(categoryId).populate('subcategories');
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a category by ID
const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;
        const updatedCategory = await MainCategory.findByIdAndUpdate(
            categoryId,
            { name },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await MainCategory.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};

