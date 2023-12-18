import FeesRecord from "../models/feesRecordSchema.js";

export const createFeesRecord = async (request) => {
    const { name, email, age, batch, paymentMonth } = request;
    const newFeesRecord = await FeesRecord.create({
        name,
        email,
        age,
        batch,
        paymentMonth,
    });

    if (!newFeesRecord) return null;
    return newFeesRecord;
};

export const getFeesPaymentByEmailAndMonth = async (query) => {
    const feesPayment = await FeesRecord.find(query);
    if (!feesPayment) return null;
    return feesPayment;
};
