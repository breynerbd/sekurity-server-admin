import { param, body } from "express-validator";
import { checkValidators } from "./check-validators.js";

export const validateGetReportById = [
    param('id')
        .isInt().withMessage('El ID del reporte debe ser un número entero')
        .notEmpty().withMessage('El ID es obligatorio'),
    checkValidators
];

export const validateUpdateReportStatus = [
    param('id')
        .isInt().withMessage('El ID del reporte debe ser un número entero'),
    body('status')
        .notEmpty().withMessage('El nuevo estado es obligatorio')
        .isString().withMessage('El estado debe ser una cadena de texto')
        .toUpperCase()
        .isIn(['ACTIVE', 'RESOLVED', 'PENDING', 'CANCELLED'])
        .withMessage('El estado debe ser uno de los siguientes: ACTIVE, RESOLVED, PENDING, CANCELLED'),
    checkValidators
];

export const validateDeleteReport = [
    param('id')
        .isInt().withMessage('El ID del reporte debe ser un número entero')
        .notEmpty().withMessage('El ID es obligatorio'),
    checkValidators
];

export const validateCreateReport = [
    body('title')
        .notEmpty().withMessage('El título es obligatorio')
        .isLength({ max: 255 }).withMessage('El título es muy largo'),
    body('incident_type')
        .notEmpty().withMessage('El tipo de incidente es obligatorio'),
    body('severity_level')
        .optional()
        .toUpperCase()
        .isIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
        .withMessage('Nivel de severidad no válido'),
    body('user_id')
        .isInt().withMessage('ID de usuario inválido'),
    body('zone_id')
        .isInt().withMessage('ID de zona inválido'),
    checkValidators
];