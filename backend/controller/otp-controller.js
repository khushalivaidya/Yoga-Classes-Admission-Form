import NodeCache from "node-cache";
import nodemailer from "nodemailer";

// cache to store the OTPs
const otpCache = new NodeCache({ stdTTL: 300 });

// generates random 6 digit OTP, and stores it to the cache
function generateOtp(key) {
    const min = 100000;
    const max = 999999;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
    otpCache.set(key, otp);
    return otp.toString();
}

// gets the OTP for respective key (email in our case)
function getOtp(key) {
    const res = otpCache.get(key);
    if (!res) return null;
    return res;
}

// removes the key, value pair of email and OTP from cache
function clearOtp(key) {
    otpCache.del(key);
}

export const sendEmail = async (request, response) => {
    try {
        const { email, otp } = request;
        let htmlTemplate = `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Welcome to Yoga Sessions</a>
                </div>
                <p style="font-size:1.1em">Hello User,</p>
                <p>Thank you for considering our Yoga sessions. Use the following OTP to complete your verification of your email. OTP is valid for 5 minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                <p style="font-size:0.9em;">Regards,<br />WalletWatch</p>
                <hr style="border:none;border-top:1px solid #eee" />
            </div>
        </div>
        `;
        const subjectMessage = "OTP for Verification - For Yoga Classes!";

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        var mailOptions = {
            to: email,
            subject: subjectMessage,
            html: htmlTemplate,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return response.status(500).json({
                    success: false,
                    message: error.message,
                });
            }

            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });
    } catch {
        console.log(error.message);
        return response.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const sendOtp = async (request, response) => {
    try {
        const { email } = request.body;

        if (!email) {
            return response.status(400).json({
                success: false,
                message: "Please give email",
            });
        }

        const otp = generateOtp(email);
        console.log("OTP generated: ", otp);

        await sendEmail(
            {
                email: email,
                otp: otp,
            },
            response
        );

        const obj = {
            otp: otp,
        };

        return response.status(200).json({
            success: true,
            otpInfo: obj,
            message: "OTP sent successfully",
        });
    } catch (err) {
        console.log(err.message);
        return response.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const verifyOTP = async (request, response) => {
    try {
        const { email, otp } = request.body;

        // error handling
        if (!email || !otp) {
            return response.status(400).json({
                success: false,
                message: "Please give Email and OTP",
            });
        }

        // converting the user entered otp to integer
        const userOtp = parseInt(otp, 10);

        // this is the correct OTP, fetching from cache
        const correctOtp = getOtp(email);

        console.log({
            email: email,
            userOTP: userOtp,
            correctOTP: correctOtp,
        });

        // is OTP is expired after some time, or already verified
        if (!correctOtp || correctOtp === undefined) {
            return response.status(400).json({
                success: false,
                message: "OTP is expired",
            });
        }

        const isValid = userOtp === correctOtp;

        if (isValid) {
            clearOtp(email);
            return response.status(200).json({
                success: true,
                message: "OTP Verified Successfully",
            });
        }

        return response.status(200).json({
            success: false,
            message: "Invalid OTP",
        });
    } catch {
        return response.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
