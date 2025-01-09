import { Category } from './model.js';


export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if(!name) {
            return res.status(400).json({ error: 'Category name is required' });
        }
        const category = new Category({ name, path: name });
        await category.save();
        console.log(`Category "${name}" added.`);

        return res.status(200).json({ message: `Category "${name}" added.` });
        
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
  }

export const addSubcategory = async (req, res) => {

    try {
        const { parentName, subcategoryName } = req.body;
        const parentCategory = await Category.findOne({ name: parentName });
        if (!parentCategory) {
          console.log(`Category "${parentName}" does not exist.`);
          return res.status(400).json({ error: `Category "${parentName}" does not exist.` });
        }
        const subcategory = new Category({
          name: subcategoryName,
          path: `${parentCategory.path}.${subcategoryName}`,
        });
        console.log(subcategory);
        await subcategory.save();
        console.log(`Subcategory "${subcategoryName}" added under "${parentName}".`);
        return res.status(200).json({ message: `Subcategory "${subcategoryName}" added under "${parentName}".` });
    } catch (error) {
        return res.status(500).json({ error });
    }
  }


  export const getSubcategories = async(req, res) => {
    try {
        const { categoryName } = req.body;
        if(!categoryName) {
            return res.status(400).json({ error: 'Category name is required' });
        }
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
          console.log(`Category "${categoryName}" does not exist.`);
          return res.status(400).json({ error: `Category "${categoryName}" does not exist.` });
        }
      
        const subcategories = await Category.find({
          path: { $regex: `^${category.path}\\.` },
        });
        console.log(`Subcategories under "${categoryName}":`, subcategories);
        return res.status(200).json({ subcategories });
        
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }

  }