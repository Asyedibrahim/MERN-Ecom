import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
    res.json({message: 'Api is working'})
};

export const deleteUser = async (req, res, next) => {
    if ( req.user.id !== req.params.userId && !res.user.isAdmin) {
        return next(errorHandler(401, 'You are not allowed to delete this account'));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.clearCookie('access_token').status(200).json('User has been deleted');
    } catch (error) {
        next(error)
    }
}