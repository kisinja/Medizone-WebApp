import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
    try {
        const dToken = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if (!dToken) return res.status(400).json({ message: "Authorization required!!", success: false });

        // Decode the token to get the user ID
        const tokenDecode = jwt.verify(dToken, process.env.JWT_SECRET);

        // Store the user's ID from the token in req.user
        req.docId = tokenDecode.id;

        // Optionally, if you want to fetch the full user data
        // req.user = await User.findById(tokenDecode.id).select("-password");

        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: "Unauthorized", success: false });
    }
};

export default authDoctor;