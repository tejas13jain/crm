const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/adminController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

// only admin role can create employees
router.post("/employees", verifyToken, requireRole("admin"), adminCtrl.createEmployee);
router.get("/employees", verifyToken, requireRole("admin"), adminCtrl.listEmployeesForAdmin);

// superadmin route example:
router.post("/create-client", verifyToken, requireRole("superadmin"), async (req, res) => {
  // implement client creation: create a user with role 'admin' or create a separate Client model
  res.json({ msg: "create-client endpoint - implement" });
});

module.exports = router;
