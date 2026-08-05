import Student from "../models/student.js"
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import Subject from "../models/subject.js";

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

//showProfile api
export const showProfile = async (req, res) => {
    res.status(200).json({
    studentName: req.student.studentName,
    studentEmail: req.student.studentEmail,
    studentRollNumber: req.student.studentRollNumber,
    age: req.student.age,
    hobbies: req.student.hobbies,
    interests: req.student.interests
});
}
//edit profile api
export const editProfile = async (req, res) =>{
    try{
        const {hobbies, age, interests} = req.body;
        await Student.findByIdAndUpdate(
            req.student._id, {age, hobbies, interests},{ new: true }
        );
        res.status(200).json({
            msg: "Profile updated successfully"
        });
    }
    catch(err){
        console.log(err);
    }
}

//change password - (get current password, check with existing password, get new pass, hash and store new pass)
export const changePassword = async(req, res) => {
    try{
        //gather details about password and check if its correct
        const {currPass, newPass} = req.body;
        const checkPass = await bcrypt.compare(currPass, req.student.studentPassword);
        if(!checkPass){
            return res.status(401).json({msg : "Credentials Doesn't Match"})
        }

        //hash the new password 
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(newPass, salt);

        //store the hashed password in database
        await Student.findByIdAndUpdate(
            req.student._id, {studentPassword : hashPass}
        );
        res.status(201).json({msg : "Password Updated Successfully"});
    }
    catch(err){
        console.log(err);

        return res.status(500).json({msg : "Internal Server Error"});
    }
}

//Show subjects of the students
export const subject = async (req, res) => {
    try{
        const subjects = await Student.find({
            studentId : req.student._id
        });
        return res.status(200).json(subjects);
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({msg : "Internal Server Error"});
    }
}

//Add subjects to the student
export const addSubject = async (req, res) => {
    try{
        const {studentId, subjectName, facultyName, subjectCode, credits} = req.body;
        if(!studentId || !subjectCode || !facultyName || !subjectName || !credits) {
            return res.status(400).json({msg : "Please enter all the details"});
        }
        await Subject.create({studentId, 
            subjectName, 
            subjectCode,
            credits,
            facultyName
        });
        res.status(201).json({msg : "Student Details Created Successfully"});
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({msg : "Internal Server Error"});
    }
}