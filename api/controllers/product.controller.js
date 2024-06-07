import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import { errorHandler } from "../utils/error.js";

export const createProduct = async (req, res, next) => {
    if (!req.user.isAdmin) {
        next(errorHandler(403, 'You are not allowed to create a product'))
    }
    try {
        const newProduct = new Product({
            ...req.body,
            userId: req.user.id
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        next(error)
    }
};

export const getAllProducts = async (req, res, next) => {
    try {
        const getProducts = await Product.find().populate('categoryId', 'name');
        res.status(200).json(getProducts);
    } catch (error) {
        next(error)
    }
};

export const deleteProduct = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this product'))
    }
    const product = await Product.findById(req.params.productId);
    if (!product) {
        return next(errorHandler(404, 'Product not found'))
    }
    try {
        await Product.findByIdAndDelete(req.params.productId);
        res.status(200).json('The product has been deleted!')
    } catch (error) {
        next(error)
    }
};

export const editProduct = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this product'))
    }
    const product = await Product.findById(req.params.productId);
    if (!product) {
        return next(errorHandler(404, 'Product not found'))
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, {
            ...req.body,
        }, { new: true });
        res.status(200).json(updatedProduct)
    } catch (error) {
        next(error)
    }
};

export const getProduct = async (req, res, next) => {
    try {
        const getProduct = await Product.findById(req.params.productId).populate('categoryId', 'name');
        res.status(200).json(getProduct);
    } catch (error) {
        next(error)
    }
    
};

export const getProductsByCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;

        const category = await Category.findById(categoryId);
        if (!category) {
            return next(errorHandler(404,'Category not found' ));
        }
        
        const products = await Product.find({ categoryId: categoryId }).select('name description regularPrice discountPrice offer trending imageUrls');

        res.status(200).json({ category, products });
    } catch (error) {
        next(error);
    }
};
