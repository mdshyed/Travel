import express from "express";
const router = express.Router();

// Register, login, profile endpoints will be added here
router.get("/", (req, res) => {
  res.json({ message: "User route placeholder (MongoDB)" });
});

export default router;
