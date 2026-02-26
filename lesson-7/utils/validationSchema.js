import { currentYear } from "./getFullYear.mjs";
import { body, query } from "express-validator";

class FormValidator {
    // --- chain validation ---
    static formValidationChain = [
        body('make')
            .notEmpty()
            .withMessage('This field is required.')
            .bail()
            .isLength({ min: 2, max: 50 })
            .withMessage('At least 2 and maximum 50 characters.')
            .trim()
            .escape(),
        body('model')
            .notEmpty()
            .withMessage('This field is required.')
            .bail()
            .isLength({ min: 2, max: 50 })
            .withMessage('At least 2 and maximum 50 characters.')
            .trim()
            .escape(),
        body('year')
            .notEmpty()
            .withMessage('This field is required.')
            .bail()
            .matches(/^\d{4}$/)
            .withMessage('Incorrect year. Must be 4 digits.')
            .isInt({ min: 1884, max: currentYear })
            .withMessage(`Incorrect year. Min: 1884, max: ${currentYear}`)
            .trim()
            .escape(),
        body('regPlate')
            .notEmpty()
            .withMessage('This field is required.')
            .bail()
            .isLength({ min: 7, max: 7 })
            .withMessage('Incorrect registration plate. Must be 7 characters.')
            .matches(/^[A-Z]{2}\d{2}[A-Z]{3}$/)
            .withMessage('Incorrect registration plate. Format: AB88CDE')
            .trim()
            .escape(),
        body('color')
            .optional({ checkFalsy: true })
            .isAlpha()
            .withMessage('Invalid value of color.')
            .isLength({ min: 2, max: 50 })
            .withMessage('At least 2 and maximum 50 characters.'),
        body('mileage')
            .optional({ checkFalsy: true })
            .toInt()
            .isInt({ min: 0 })
            .withMessage('Incorrect mileage.'),
        body('price')
            .notEmpty()
            .withMessage('This field is required.')
            .bail()
            .toInt()
            .isInt({ min: 0 })
            .withMessage('Incorrect price.')
            .trim()
            .escape(),
        body('description')
            .optional({ checkFalsy: true })
            .trim()
            .escape(),
    ]

    static filterValidationChain = [
        query('minYear')
            .optional({ checkFalsy: true })
            .matches(/^\d{4}$/)
            .withMessage('Incorrect year. Must be 4 digits.')
            .isInt({ min: 1884, max: currentYear })
            .withMessage(`Incorrect year. Min: 1884, max: ${currentYear}`)
            .trim()
            .escape(),
        query('maxYear')
            .optional({ checkFalsy: true })
            .matches(/^\d{4}$/)
            .withMessage('Incorrect year. Must be 4 digits.')
            .custom((value, {req}) => {
                if(req.query.minYear && Number(value) < Number(req.query.minYear)) {
                    throw new Error('Max year must be greater than min year')
                }
                return true
            })
            .withMessage(`Incorrect year. Min: 1884, max: ${currentYear}`)
            .trim()
            .escape(),
        query('price')
            .optional({ checkFalsy: true })
            .toInt()
            .isInt({ min: 0, max: 1000000000 })
            .withMessage('Incorrect price.')
            .trim()
            .escape(),
    ]

    // --- schema validation ---
    // static formValidationSchema = {
    //     make: {
    //         notEmpty: {
    //             errorMessage: 'This field is required.',
    //             bail: true,
    //         },
    //         isLength: {
    //             options: { min: 2, max: 50 },
    //             errorMessage: 'At least 2 and maximum 50 characters.'
    //         },
    //         trim: true,
    //         escape: true,
    //     },
    //     model: {
    //         notEmpty: {
    //             errorMessage: 'This field is required.',
    //             bail: true,
    //         },
    //         isLength: {
    //             options: { min: 2, max: 50 },
    //             errorMessage: 'At least 2 and maximum 50 characters.'
    //         },
    //         trim: true,
    //         escape: true,
    //     },
    //     year: {
    //         notEmpty: {
    //             errorMessage: 'This field is required.',
    //             bail: true,
    //         },
    //         matches: {
    //             options: /^\d{4}$/,
    //             errorMessage: 'Incorrect year.  Must be 4 digits.'
    //         },
    //         isInt: {
    //             options: { min: 1884, max: currentYear },
    //             errorMessage: `Incorrect year. Min: 1884, max: ${currentYear}`
    //         },
    //         trim: true,
    //         escape: true,
    //     },
    //     regPlate: {
    //         notEmpty: {
    //             errorMessage: 'This field is required.',
    //             bail: true,
    //         },
    //         isLength: {
    //             options: { min: 7, max: 7 },
    //             errorMessage: 'Incorrect registration plate. Must be 7 characters.'
    //         },
    //         matches: {
    //             options: /^[A-Z]{2}\d{2}[A-Z]{3}$/,
    //             errorMessage: 'Incorrect registration plate. Format: AB88CDE'
    //         },
    //         trim: true,
    //         escape: true,
    //     },
    //     color: {
    //         optional: true,
    //         trim: true,
    //         escape: true,
    //         // isLength: {
    //         //     options: { min: 2, max: 50 },
    //         //     errorMessage: 'At least 2 and maximum 50 characters.'
    //         // },
    //     },
    //     mileage: {
    //         optional: true,
    //         trim: true,
    //         escape: true,
    //         toInt: true,
    //         isInt: {
    //             options: { min: 0 },
    //             errorMessage: 'Incorrect mileage.'
    //         },
    //     },
    //     price: {
    //         notEmpty: {
    //             errorMessage: 'This field is required.',
    //             bail: true,
    //         },
    //         toInt: true,
    //         isInt: {
    //             options: { min: 0 },
    //             errorMessage: 'Incorrect price.'
    //         },
    //         trim: true,
    //         escape: true,
    //     },
    //     description: {
    //         optional: true,
    //         trim: true,
    //         escape: true,
    //     }
    // }
}


export default FormValidator