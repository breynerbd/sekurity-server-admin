import { Router } from "express";

import {
    getReports,
    getReportById,
    updateReportStatus,
    deleteReport
} from "./report.controller.js";

const router = Router();

router.get("/", getReports);

router.get("/:id", getReportById);

router.patch("/:id/status", updateReportStatus);

router.delete("/:id", deleteReport);

export default router;