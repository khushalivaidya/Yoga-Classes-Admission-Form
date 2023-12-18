import FeesRecord from "../models/feesRecordSchema";

export const createFeesRecord = async (request) => {
    const { name, email, dateOfBirth, batch, paymentDate } = request;
    const newFeesRecord = await FeesRecord.create({
        name,
        email,
        dateOfBirth,
        batch,
        paymentDate,
    });

    if (!newFeesRecord) return null;
    return newFeesRecord;
};

export const getFeesPaymentByEmailAndMonth = async (query) => {
    const feesPayment = await FeesRecord.find(query);
    if (!feesPayment) return null;
    return feesPayment;
};
