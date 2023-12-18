// import FeesRecord from "../models/feesRecordSchema";
import * as feeRecordService from "../services/feesRecord-service.js";
// import moment from "moment";

export const createFeesRecord = async (request, response) => {
    try {
        const { email, name, dateOfBirth, batch } = request.body;

        if (!email || !name || !dateOfBirth || !batch) {
            return response.status(400).json({
                success: false,
                message: "Please fill all the fields!",
            });
        }

        const date = new Date();
        const month = date.getMonth();
        feeRecordService.createFeesRecord({
            name: name,
            email: email,
            dateOfBirth: dateOfBirth,
            batch: batch,
            paymentMonth: month,
        });

        return response.status(200).json({
            success: true,
            message: "Fees payment transaction recorded successfully.",
        });
    } catch (err) {
        return response.status(500).json({
            sucess: false,
            message: err.message,
        });
    }
};

export const getCurrentMonthFeesRecordByEmail = async (request, response) => {
    try {
        const { email } = request.body;
        const date = new Date();
        const month = date.getMonth();

        const feesRecord = await feeRecordService.getFeesPaymentByEmailAndMonth(
            { email, month }
        );

        return response.status(200).json({
            success: true,
            feesRecord: feesRecord,
        });
    } catch (err) {
        response.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
