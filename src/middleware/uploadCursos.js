import { body } from "express-validator";

const validationRules = [
    body('title').optional().isString().notEmpty(),
    body('summary').optional().isString().notEmpty(),
    body('quiz').optional().isArray().notEmpty(),
    body('content').optional().isString().notEmpty(),
    body('update_date').optional().isDate(),
];


export { validationRules }