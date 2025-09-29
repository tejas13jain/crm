// backend/seed/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("connected");

  // create superadmin
  const saEmail = "superadmin@example.com";
  let superadmin = await User.findOne({ email: saEmail });
  if (!superadmin) {
    const pwd = await bcrypt.hash("SuperPassword123!", 10);
    superadmin = new User({ name: "Super Admin", email: saEmail, password: pwd, role: "superadmin" });
    await superadmin.save();
    console.log("superadmin created:", saEmail);
  } else {
    console.log("superadmin already exists");
  }

  // create an admin (client) created by superadmin
  const adminEmail = "clientadmin@example.com";
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    const pwd = await bcrypt.hash("AdminPassword123!", 10);
    admin = new User({ name: "Client Admin", email: adminEmail, password: pwd, role: "admin", createdBy: superadmin._id });
    await admin.save();
    console.log("admin created:", adminEmail);
  } else {
    console.log("admin already exists");
  }

  // optional: create an employee created by admin
  const empEmail = "employee1@example.com";
  let emp = await User.findOne({ email: empEmail });
  if (!emp) {
    const pwd = await bcrypt.hash("EmployeePassword123!", 10);
    emp = new User({ name: "Employee One", email: empEmail, password: pwd, role: "employee", createdBy: admin._id });
    await emp.save();
    console.log("employee created:", empEmail);
  } else {
    console.log("employee already exists");
  }

  mongoose.disconnect();
}
main().catch(err => { console.error(err); mongoose.disconnect(); });
