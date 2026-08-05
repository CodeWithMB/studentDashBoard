import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    studentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Student",
        required : true,
    },
    subjectName : {
        type : String,
        required : true,
    },
    facultyName : {
        type : String,
        required : true,
    },
    subjectCode : {
        type : String,
        required : true,
        unique : true,
    },
    credits : {
        type : Number,
        required : true,
    }
})

const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;