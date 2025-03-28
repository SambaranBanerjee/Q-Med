import mongoose from "mongoose";

const doctors = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    patientCount: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    }
});

const Doctor = mongoose.model("Doctors", doctors);

export default Doctor;
