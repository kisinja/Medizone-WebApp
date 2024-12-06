import jwt from 'jsonwebtoken';

// admin authentication middleware
const authAdmin = (req, res, next) => {
    try {
        /* const { atoken } = req.headers;
        if (!atoken) return res.status(400).json({ message: "Authorization required!!", success: false }); */

        // obtain atoken from Bearer token
        const atoken = req.headers.authorization.split(" ")[1];

        const tokenDecode = jwt.verify(atoken, process.env.JWT_SECRET);

        if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ message: "Invalid authorization", success: false });
        }
        next();

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message, success: false });
    }
};

export default authAdmin;