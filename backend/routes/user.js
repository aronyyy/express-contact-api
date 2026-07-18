const express = require("express");
const router = express.Router();
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const { validateToken } = require("../middleware/validateTokenHandler");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", (req, res) => {
  res.json({"message": "Get contact profile"});
});

router.get("/current", validateToken, currentUser);


module.exports = router;