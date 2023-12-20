import React, { useEffect, useState } from "react";
import validator from "validator";
import TextField from "@mui/material/TextField";
import { Alert, Button, Grid } from "@mui/material";
import axios from "axios";
import { sendOtpApi, verifyOtpApi } from "../utils/ApiRequests.js";

const VerifyEmail = (props) => {
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [displayIncorrectOTP, setDisplayIncorrectOTP] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userEnteredInfo, setUserEnteredInfo] = useState({
        email: "",
        otp: "",
    });
    const [isOtpSentToUser, setIsOtpSentToUser] = useState(false);

    const handleChange = (e) => {
        setError(false);
        setErrorMessage("");
        setUserEnteredInfo({
            ...userEnteredInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError(false);
        setErrorMessage("");

        setDisplayIncorrectOTP(false);
        setUserEnteredInfo({ ...userEnteredInfo, otp: "" });
        try {
            const response = await axios.post(sendOtpApi, {
                email: userEnteredInfo.email,
            });

            if (response.data.success) {
                setIsOtpSentToUser(true);
                setError(false);
                setErrorMessage("");
            } else {
                setError(true);
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError(false);
        setErrorMessage("");
        try {
            const response = await axios.post(verifyOtpApi, {
                email: userEnteredInfo.email,
                otp: userEnteredInfo.otp,
            });

            if (response.data.success) {
                setDisplayIncorrectOTP(false);
                setIsEmailVerified(true);
                localStorage.setItem(
                    "user",
                    JSON.stringify(userEnteredInfo.email)
                );
                props.setUserInfo(userEnteredInfo.email);
            } else {
                setDisplayIncorrectOTP(true);
                setUserEnteredInfo({
                    ...userEnteredInfo,
                    [userEnteredInfo.otp]: "",
                });
            }

            setError(false);
            setErrorMessage("");
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    };

    useEffect(() => {
        if (
            userEnteredInfo.email.length === 0 ||
            validator.isEmail(userEnteredInfo.email)
        ) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    }, [userEnteredInfo.email]);

    return (
        <>
            <div className="header-bar">
                <h1 style={{ marginLeft: "58px" }}>Yoga Classes</h1>
            </div>
            <div className="container">
                <Grid container spacing={4}>
                    <Grid item xs={12} textAlign={"center"}>
                        <h1>Verify your Email-id</h1>
                    </Grid>

                    {error && (
                        <Grid item xs={12} textAlign={"center"}>
                            <Alert severity="error" fullWidth>
                                {errorMessage}
                            </Alert>
                        </Grid>
                    )}

                    <Grid item xs={8}>
                        <TextField
                            required
                            fullWidth
                            label="Email"
                            variant="outlined"
                            value={userEnteredInfo.email}
                            onChange={handleChange}
                            name="email"
                            helperText={
                                !isEmailValid
                                    ? "Please Enter a valid Email"
                                    : ""
                            }
                            error={!isEmailValid}
                            disabled={isOtpSentToUser}
                        />
                    </Grid>
                    {!isEmailVerified ? (
                        <Grid item xs={4} textAlign={"center"}>
                            <Button
                                fullWidth
                                style={{
                                    textTransform: "none",
                                    padding: "14px 0px",
                                }}
                                onClick={handleSendOTP}
                                disabled={
                                    !isEmailValid ||
                                    userEnteredInfo.email.length === 0 ||
                                    isOtpSentToUser ||
                                    isEmailVerified
                                }
                                variant="contained"
                            >
                                SEND OTP
                            </Button>
                        </Grid>
                    ) : (
                        <Grid item xs={4} textAlign={"center"}>
                            <Alert severity="success">Email Verified</Alert>
                        </Grid>
                    )}

                    {isOtpSentToUser && !isEmailVerified && (
                        <>
                            <Grid item xs={6} textAlign={"left"}>
                                <TextField
                                    required
                                    name="otp"
                                    label="Enter OTP"
                                    value={userEnteredInfo.otp}
                                    disabled={
                                        !isOtpSentToUser ||
                                        displayIncorrectOTP ||
                                        isEmailVerified
                                    }
                                    fullWidth
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6} textAlign={"center"}>
                                <Button
                                    style={{
                                        textTransform: "none",
                                        padding: "14px 0px",
                                    }}
                                    onClick={handleVerifyOtp}
                                    disabled={
                                        displayIncorrectOTP ||
                                        userEnteredInfo.otp.length === 0 ||
                                        isEmailVerified
                                    }
                                    fullWidth
                                    variant="contained"
                                >
                                    Verify Email
                                </Button>
                            </Grid>
                        </>
                    )}

                    {displayIncorrectOTP && (
                        <>
                            <Grid item xs={6} textAlign={"center"}>
                                <Alert severity="error">Incorrect OTP</Alert>
                            </Grid>
                            <Grid item xs={6} textAlign={"center"}>
                                <Button
                                    fullWidth
                                    onClick={handleSendOTP}
                                    disabled={
                                        !isEmailValid ||
                                        userEnteredInfo.length === 0
                                    }
                                    variant="contained"
                                    style={{
                                        textTransform: "none",
                                        padding: "14px 0px",
                                    }}
                                >
                                    ReSend OTP
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            </div>
        </>
    );
};

export default VerifyEmail;
