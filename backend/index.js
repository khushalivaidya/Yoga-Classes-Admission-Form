import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "./DB/Database.js";
import otpRouter from "./router/otp-router.js";
import feeRecordRouter from "./router/feeRecord-router.js";

dotenv.config({ path: "./config/config.env" });
const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (request, response) => {
    response.send("Hello World!");
});

app.use("/api/otp", otpRouter);
app.use("/api/feesRecord", feeRecordRouter);

app.listen(port, () => {
    connectDB();
    console.log(`Server running on http://localhost:${port}`);
});
