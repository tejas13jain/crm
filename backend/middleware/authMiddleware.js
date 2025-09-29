const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ msg: "No token" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

// higher order role-check middleware
exports.requireRole = (roles = []) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: "No user" });
  if (!Array.isArray(roles)) roles = [roles];
  if (!roles.includes(req.user.role)) return res.status(403).json({ msg: "Forbidden" });
  next();
};
