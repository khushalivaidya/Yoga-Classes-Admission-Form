import * as feeRecordService from "../services/feesRecord-service.js";
// import moment from "moment";

export const createFeesRecord = async (request, response) => {
    try {
        const { email, name, age, batch } = request.body;

        if (!email || !name || !age || !batch) {
            return response.status(400).json({
                success: false,
                message: "Please fill all the fields!",
            });
        }

        const date = new Date();
        const month = date.getMonth();

        if (!month) {
            return response.status(400).json({
                success: false,
                message: "Cannot find month!",
            });
        }
        feeRecordService.createFeesRecord({
            name: name,
            email: email,
            age: age,
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
        let query = {
            email: email,
            paymentMonth: month,
        };

        const feesRecord = await feeRecordService.getFeesPaymentByEmailAndMonth(
            query
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
