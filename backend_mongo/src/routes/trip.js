import express from "express";
const router = express.Router();

// Trip CRUD endpoints will be added here
router.get("/", (req, res) => {
  res.json({ message: "Trip route placeholder (MongoDB)" });
});

export default router;
