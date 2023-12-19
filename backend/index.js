import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./DB/Database.js";
import otpRouter from "./router/otp-router.js";
import feeRecordRouter from "./router/feeRecord-router.js";

dotenv.config({ path: "./config/config.env" });
const app = express();
const port = process.env.PORT;

connectDB();

const allowedOrigins = [
    "http://localhost:3000",
    "yoga-classes-admission-form.vercel.app",
];

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
        methods: ["GET", "POST", "PUT"],
    })
);

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (request, response) => {
    response.send("Hello World!");
});

app.use("/api/otp", otpRouter);
app.use("/api/feesRecord", feeRecordRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
