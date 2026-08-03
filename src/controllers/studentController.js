import Student from "../models/student.js"
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";

//Register Api
export const registerStudent = async (req, res) => {
    const {studentName, studentRollNumber, studentEmail, studentPassword} = req.body;
    if(!studentName || !studentRollNumber ||!studentEmail || !studentPassword){
       return res.status(400).json({msg : "Please fill in all the fields"});
    }
    const studentExists = await Student.findOne({
    $or : [
        {studentEmail}, {studentRollNumber}
    ]
    });
    if(studentExists){
        return res.status(409).json({msg : "Student Already Exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(studentPassword, salt);

    const student = await Student.create({
        studentName, studentEmail, studentRollNumber, studentPassword: hashedPassword
    })
    res.status(201).json({msg : "User created successfully"});
}


//Login Api
export const loginStudent = async (req, res) => {
    const {studentEmail, studentPassword, } = req.body;
    if(!studentEmail || !studentPassword){
        return res.status(400).json({msg : "Please fill in all the fields"});
    }
    const userExists = await Student.findOne({
        studentEmail
    })

    if(!userExists){
        return res.status(400).json({msg : "Invalid Credentials"});
    }
    const checkPass = await bcrypt.compare(studentPassword, userExists.studentPassword);
    if(!checkPass){
        return res.status(401).json({msg : "Invalid Credentials"});
    }
    const token = jwt.sign(
        {id : userExists._id}, process.env.JWT_SECRET, {expiresIn : "30d"}
    );
    res.status(200).json({msg : "User logged in successfully", studentName:userExists.studentName, token});
}

export const getStudents = async (req, res)=>{
    const students = await Student.find();
    res.status(200).json(students);
}

// dashboard controller
export const dashboard = (req, res) => {
    res.send({msg : "Hey there, this is the dashboard"});
}
