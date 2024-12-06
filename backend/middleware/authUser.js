import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if (!token) return res.status(400).json({ message: "Authorization required!!", success: false });

        // Decode the token to get the user ID
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // Store the user's ID from the token in req.user
        req.user = tokenDecode.id;

        // Optionally, if you want to fetch the full user data
        // req.user = await User.findById(tokenDecode.id).select("-password");

        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: "Unauthorized", success: false });
    }
};

export default authUser;