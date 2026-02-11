import * as z from "zod";
import { currentYear } from "./getFullYear.mjs";

export const formValidationSchema = z.object({
    make: z.string().trim().nonempty
        ({ message: 'This field is required.' }).min(2, { message: 'At least 2 characters.' }).max(50, { message: 'Maximum 50 characters.' }),
    model: z.string().trim().nonempty
        ({ message: 'This field is required.' }).min(2, { message: 'At least 2 characters.' }).max(50, { message: 'Maximum 50 characters.' }),
    year: z.coerce.number({ message: 'This field is required.' }).int({ message: 'Must be an integer.' }).min(1884, { message: 'Incorrect year. Min: 1884' }).max(currentYear, { message: `Incorrect year. Max: ${currentYear}` }),
    regPlate: z.string().trim().nonempty
        ({ message: 'This field is required.' }).min(7, { message: 'Incorrect registration plate. Must be 7 characters.' }).max(7, { message: 'Incorrect registration plate. Must be 7 characters.' }).regex(/^[A-Z]{2}\d{2}[A-Z]{3}$/, { message: 'Incorrect registration plate. Format: AB88CDE' }),
    color: z.string().trim().optional(),
    mileage: z.preprocess(
        val => {
            if (val === '' || val === undefined) return undefined
            return Number(val)
        },
        z.number({ message: 'Must be an integer.' }).int().positive({ message: 'Incorrect mileage.' }).optional()
    ),
    price: z.coerce.number({ message: 'This field is required.' }).int({ message: 'Must be an integer.' }).positive({ message: 'Incorrect price.' }),
    description: z.string().trim().optional()
})