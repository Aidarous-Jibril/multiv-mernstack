const mongoose = require("mongoose")

const mainCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }]
});

module.exports = mongoose.model('MainCategory', mainCategorySchema);
