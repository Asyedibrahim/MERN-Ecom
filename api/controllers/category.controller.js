import Category from "../models/category.model.js";
import { errorHandler } from "../utils/error.js";

export const createCategory = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create category'));
    }

    const {name, description} = req.body;

    if (!name || !description || name === '' || description === '') {
        return next(errorHandler(400, 'Name and Description are required'))
    }

    try {
        const newCategory = new Category({name, description});
        await newCategory.save();
        res.status(201).json(newCategory);
        
    } catch (error) {
        next(error)
    }
};

export const getCategory = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to get category'));
    }

    try {
        const categories = await Category.find({categoryId: req.body.categoryId});
        res.status(200).json(categories);
    } catch (error) {
        next(error)
    }
};