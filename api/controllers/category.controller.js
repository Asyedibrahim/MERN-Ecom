import Category from "../models/category.model.js";
import { errorHandler } from "../utils/error.js";

export const createCategory = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create category'));
    }

    const {name} = req.body;

    if (!name || name === '') {
        return next(errorHandler(400, 'Name is required'))
    }

    try {
        const newCategory = new Category({name});
        await newCategory.save();
        res.status(201).json(newCategory);
        
    } catch (error) {
        if (error.code === 11000) {
            return next(errorHandler(400, 'Category already exists!'));
        } else {
            next(error)
        }
    }
};

export const getCategory = async (req, res, next) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories);
    } catch (error) {
        next(error)
    }
};


export const deleteCategory = async (req, res, next) => {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
        return next(errorHandler(404, 'Category not found!'));
    }
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to get category'));
    }

    try {
        await Category.findByIdAndDelete(req.params.categoryId);
        res.status(200).json('Category has been deleted');
    } catch (error) {
        next(error)
    }
};

export const editCategory = async (req, res, next) => {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
        return next(errorHandler(404, 'Category not found!'));
    }
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to edit this category!'))
    }
    
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.categoryId, {
            name: req.body.name
        }, { new: true });
        res.status(200).json(updatedCategory);
    } catch (error) {
        next(error)
    }
};