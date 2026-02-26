import mongoose from 'mongoose'
import { currentYear } from "../utils/getFullYear.mjs";

const carSchema = new mongoose.Schema(
    {
        make: {
            type: String,
            required: [true, 'This field is required.'],
            minlength: [2, 'At least 2 characters.'],
            maxlength: [50, 'Maximum 50 characters.'],
            trim: true,
        },
        model: {
            type: String,
            required: [true, 'This field is required.'],
            minlength: [2, 'At least 2 characters.'],
            maxlength: [50, 'Maximum 50 characters.'],
            trim: true,
        },
        year: {
            type: Number,
            required: [true, 'This field is required.'],
            match: [/^\d{4}$/,
                'Incorrect year.  Must be 4 digits.'],
            validate: [
                {
                    validator: (v) => v > 1884 && v < currentYear,
                    message: `Incorrect year. Min: 1884, max: ${currentYear}`,
                }],
        },
        regPlate: {
            type: String,
            required: [true, 'This field is required.'],
            minlength: [7, 'At least 2 characters.'],
            maxlength: [7, 'Maximum 7 characters.'],
            match: [/^[A-Z]{2}\d{2}[A-Z]{3}$/,
                'Incorrect registration plate. Format: AB88CDE'],
            trim: true,
        },
        color: {
            type: String,
            trim: true,
        },
        mileage: {
            type: Number,
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'This field is required.'],
            min: [1, 'Incorrect price amount!']
        },
        description: {
            type: String,
            trim: true,
        },
        images: {
            type: Array,
        },
    },
    { timestamps: true },
)
export default mongoose.model('Car', carSchema)
