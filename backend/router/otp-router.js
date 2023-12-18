import { Router } from "express";
import * as controller from "../controller/otp-controller.js";

const router = Router();

router.post("/sendOtp", controller.sendOtp);

router.post("/verifyOtp", controller.verifyOTP);

export default router;
