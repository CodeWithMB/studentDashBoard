import { registerStudent, getStudents, loginStudent, dashboard, subject, showProfile, editProfile, changePassword} from "../controllers/studentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";
const router = express.Router();
router.post("/register", registerStudent);
router.get("/getStudents", getStudents);
router.post("/login", loginStudent)
router.get("/dashboard", authMiddleware, dashboard);
router.get('/showProfile', authMiddleware, showProfile);
router.put("/editProfile", authMiddleware, editProfile);
router.put("/changePassword", authMiddleware, changePassword);
router.get("/subject", authMiddleware, subject);
export default router;