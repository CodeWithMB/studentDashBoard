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

const studentDetails = mongoose.model("studentDetails", studentSchema);
export default studentDetails;