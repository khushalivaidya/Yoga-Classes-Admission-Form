import { Router } from "express";
import * as controller from "../controller/feesRecord-controller.js";

const router = Router();

router.post("/createFeesRecord", controller.createFeesRecord);

router.get(
    "/getCurrentMonthFeesRecordByEmail",
    controller.getCurrentMonthFeesRecordByEmail
);

export default router;
