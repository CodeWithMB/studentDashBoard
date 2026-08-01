import { registerStudent, getStudents, loginStudent } from "../controllers/studentController.js";
import express from "express";
const router = express.Router();
router.post("/register", registerStudent);
router.get("/getStudents", getStudents);
router.post("/login", loginStudent)
export default router;