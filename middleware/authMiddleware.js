import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

    // agr token na ho ya "Bearer" se start na ho to error do
        if (!token || !token.startsWith("Bearer")) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        // "Bearer xyz" ko split kr k sirf token (xyz) le lia
        token = token.split(" ")[1];


        // token ko verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // us id se user dhoonda, password chhor k
        const user = await User.findById(decoded.id).select("-password");
        // user ka data request k sath attach kr dia, agy use hoga
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

export default protect;