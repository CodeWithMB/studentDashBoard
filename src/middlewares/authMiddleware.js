import jwt from "jsonwebtoken";
import Student from "../models/student.js";

export const authMiddleware = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({msg : "Unauthorized"});
    }
    const checkBearer = authHeader.startsWith("Bearer");

    if(checkBearer != true){
        return res.status(401).json({msg : "Unauthorized"});
    }
    const arr = authHeader.split(" ");
    const token = arr[1];
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    const student = await Student.findById(verifiedToken.id);
    if(!student){
        return res.status(404).json({msg :"no student found"});
    }
    else{
        req.student = student;
    }
    }
    catch(err){
        return res.status(401).json({ msg: "Unauthorized" });
    }
    next();
}