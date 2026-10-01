import SubCategory from "../models/SubCategory.js"; // model import kia

// sb sub-categories fetch krna (public)
const getAllSubCategories = async (req, res) => {
  try {
    const category = req.query.category; // URL se ?category=xyz nikala (agar diya ho)

    let filter = {}; // pehle khali filter bna lia (matlab: sab dikhao)

    if (category) {
      // agr category id di gai hai, to sirf usi ki sub-categories dhoondo
      filter = { parentCategory: category };
    }

    const subCategories = await SubCategory.find(filter).populate("parentCategory");
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// nai sub-category banana (sirf admin)
const createSubCategory = async (req, res) => {
  try {
    const name = req.body.name; // naam body se lia
    const parentCategory = req.body.parentCategory; // parent category id body se li

    const subCategory = await SubCategory.create({
      name: name,
      parentCategory: parentCategory,
    });

    res.status(201).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// sub-category update krna (sirf admin)
const updateSubCategory = async (req, res) => {
  try {
    const id = req.params.id; // URL se id nikali
    const name = req.body.name;
    const parentCategory = req.body.parentCategory;

    const updated = await SubCategory.findByIdAndUpdate(
      id,
      { name: name, parentCategory: parentCategory },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "SubCategory not found" });
      return; // yahan function rok dia, aage code na chale
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// sub-category delete krna (sirf admin)
const deleteSubCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await SubCategory.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ message: "SubCategory not found" });
      return;
    }

    res.status(200).json({ message: "SubCategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllSubCategories, createSubCategory, updateSubCategory, deleteSubCategory };