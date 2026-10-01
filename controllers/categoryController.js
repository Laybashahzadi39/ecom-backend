import Category from "../models/category.js";

// sb categories fetch krne k lye 
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find(); 
    res.status(200).json(categories); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

// nai category banane k lye (sirf admin - protected)
const createCategory = async (req, res) => {
  try {
    const { name } = req.body; 

    const category = await Category.create({ name }); 

    res.status(201).json(category); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// category update krne k lye (sirf admin - protected)
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name } = req.body; 

    // id se category dhoond kr naya naam set kia, { new: true } se updated wali document return hogi
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" }); 
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// category delete krne k lye (sirf admin - protected)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params; // URL se id nikali
// id se dhoond kr delete kr dia

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { getAllCategories, createCategory, updateCategory, deleteCategory };