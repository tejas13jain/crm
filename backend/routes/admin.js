const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/adminController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

router.post("/employees", verifyToken, requireRole("admin"), adminCtrl.createEmployee);
router.get("/employees", verifyToken, requireRole("admin"), adminCtrl.listEmployeesForAdmin);

router.get("/users", adminCtrl.getAllUsers);

router.post("/create-client", verifyToken, requireRole("superadmin"), async (req, res) => {
  res.json({ msg: "create-client endpoint - implement" });
});

module.exports = router;
