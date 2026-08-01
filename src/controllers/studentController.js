import Student from "../models/student.js"

const registerStudent = async (req, res) => {
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
    const student = await Student.create({
        studentName, studentEmail, studentRollNumber, studentPassword
    })
    res.status(201).json({msg : "User created successfully"});
}

export default registerStudent;