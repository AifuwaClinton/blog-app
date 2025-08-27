const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.status(401).json({ message: "Unauthorized" });

        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "Token Expired" });
    }


};

module.exports = authMiddleware;
