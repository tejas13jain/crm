const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const createdBy = req.user.id; // admin's id

    if (!name || !email || !password) return res.status(400).json({ msg: "Missing" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role: role || "employee", createdBy });

    await user.save();
    res.status(201).json({ msg: "Employee created", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listEmployeesForAdmin = async (req, res) => {
  try {
    const adminId = req.user.id;
    const employees = await User.find({ createdBy: adminId }).select("-password");
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllUsers = async (req, res) => {
 try {
    const users = await User.find().select("-password"); // exclude password
    if (!users || users.length === 0) {
      return res.status(200).json({ msg: "No users found" });
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
