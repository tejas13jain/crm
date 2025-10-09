const User    = require("../models/User");
const Setting    = require("../models/Setting");

const bcrypt  = require("bcryptjs");

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const createdBy = req.user.id; // admin's id

    if (!name || !email || !password) return res.status(400).json({ msg: "Missing" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user   = new User({ name, email, password: hashed, role: role || "employee", createdBy });

    await user.save();
    res.status(201).json({ msg: "Employee created", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listEmployeesForAdmin = async (req, res) => {
  try {
    const adminId   = req.user.id;
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


exports.updateSetting = async (req, res) => {
  try {
    const {
      name,
      title,
      logo,
      favicon,
      number,
      address,
      facebook,
      twitter,
      insta,
      youtube
    } = req.body;

    const updatedBy = req.user.id; // admin's id    

    if (!name || !title)
      return res.status(400).json({ msg: "Name and Title are required" });

    // Fetch the first (and only) setting record
    let setting = await Setting.findOne();

    if (!setting) {
      // No setting exists → create one
      setting = new Setting({
        name,
        title,
        logo,
        favicon,
        number,
        address,
        facebook,
        twitter,
        insta,
        youtube,
        updatedBy
      });
      await setting.save();
      return res.status(201).json({ msg: "Setting created", settingId: setting._id });
    } else {
      // Setting exists → update it
      setting.name      = name;  // optional: update the name too
      setting.title     = title;
      setting.logo      = logo || setting.logo;
      setting.favicon   = favicon || setting.favicon;
      setting.number    = number || setting.number;
      setting.address   = address || setting.address;
      setting.facebook  = facebook || setting.facebook;
      setting.twitter   = twitter || setting.twitter;
      setting.insta     = insta || setting.insta;
      setting.youtube   = youtube || setting.youtube;
      setting.updatedBy = updatedBy;

      await setting.save();
      return res.json({ msg: "Setting updated", settingId: setting._id });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSetting = async (req, res) => {
  try {
    const setting = await Setting.findOne();  
    if (!setting) {
      return res.status(404).json({ msg: "No setting found" });
    } 
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
};
