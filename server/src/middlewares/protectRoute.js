import jwt from "jsonwebtoken";

const protectRoute = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id; // Assuming the token contains user ID
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};

export default protectRoute;
