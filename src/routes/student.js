import registerStudent from "../controllers/studentController.js";
import express from "express";
const router = express.Router();
router.post("/register", registerStudent);

export default router;