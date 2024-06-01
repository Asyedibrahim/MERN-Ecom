import Product from "../models/product.model.js";
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