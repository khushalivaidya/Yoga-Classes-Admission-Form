import mongoose from "mongoose";
import validator from "validator";

const feesRecordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: validator.isEmail,
    },

    dateOfBirth: {
        type: Date,
        required: [true, "Date Of Birth is required"],
    },

    batch: {
        type: String,
        required: [true, "Batch is required"],
    },

    paymentMonth: {
        type: Number,
        required: [true, "Month is required"],
    },
});

const FeesRecord = mongoose.model("FeesRecord", feesRecordSchema);
export default FeesRecord;
