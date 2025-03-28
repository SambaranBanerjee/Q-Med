import Doctor from "../models/doctorsModel.js";
/*1. Implement pagination to limit the number of doctors returned in a single request, improving performance and usability.

2. Add error logging to capture and analyze the error details for better debugging and monitoring.

3. Validate the request parameters to ensure that only valid requests are processed, enhancing security and reliability.*/
export const getDoctors = async (req, res) =>{
    try {
        const doctors = await Doctor.find();
        res.status(200).json({doctors});
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
}

export const addDoctors = async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(400).json({ message: 'Invalid request' });
    }
}
