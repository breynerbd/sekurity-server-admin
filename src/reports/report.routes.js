import { Router } from "express";
import {
    getReports,
    getReportById,
    updateReportStatus,
    deleteReport
} from "./report.controller.js";
import { 
    validateGetReportById, 
    validateUpdateReportStatus, 
    validateDeleteReport 
} from "../../middlewares/report-validators.js";

const router = Router();

router.get("/", getReports);

router.get("/:id", validateGetReportById, getReportById);

router.patch("/:id/status", validateUpdateReportStatus, updateReportStatus);

router.delete("/:id", validateDeleteReport, deleteReport);

export default router;