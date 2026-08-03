import { registerStudent, getStudents, loginStudent, dashboard} from "../controllers/studentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";
const router = express.Router();
router.post("/register", registerStudent);
router.get("/getStudents", getStudents);
router.post("/login", loginStudent)
router.get("/dashboard", authMiddleware, dashboard);
export default router;