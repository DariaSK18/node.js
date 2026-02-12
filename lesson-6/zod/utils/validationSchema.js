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

export const filterValidationSchema = z.object({
    minYear: z.string().trim().optional().refine(val => !val || /^\d{4}$/.test(val), { message: 'Incorrect year. Must be 4 digits.' }).refine(val => {
        if (!val) return true
        const year = Number(val)
        return year >= 1884 && year <= currentYear
    }, { message: `Incorrect year. Min: 1884.` }),
    maxYear: z.string().trim().optional().refine(val => !val || /^\d{4}$/.test(val), { message: 'Incorrect year. Must be 4 digits.' }).refine(val => {
        if (!val) return true
        const year = Number(val)
        return year >= 1884 && year <= currentYear
    }, { message: `Incorrect year. Max: ${currentYear}` }),
    price: z.preprocess(
        val => {
            if (val === '' || val === undefined) return undefined
            return Number(val)
        },
        z.number({ message: 'Must be an integer.' }).int().positive({ message: 'Incorrect price.' }).optional()
    )
})
.refine(data => {
    if(data.minYear && data.maxYear) return data.maxYear >= data.minYear
    return true
}, {message: 'Max year must be greater than min year'}
)
