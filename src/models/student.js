import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    studentName : {
        type : String,
        required : true,
    },
    studentRollNumber : {
        type : String,
        unique : true,
        required : true,
    },
    studentEmail : {
        type : String,
        unique : true,
        required : true,
    },
    studentPassword : {
        type : String,
        required : true,
    }
})

const Student = mongoose.model("Student", studentSchema);
export default Student;