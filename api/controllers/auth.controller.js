import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'

export const signUp = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;

        if (!username || !email || !password || username === '' || email === '' || password === '') {
            
        }
    
        const generatedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({username, email, password: generatedPassword});
        await newUser.save()
    
        const {password: pass, ...rest} = newUser._doc;
    
        res.status(200).json(rest)
        
    } catch (error) {
        next(error)
    }
}