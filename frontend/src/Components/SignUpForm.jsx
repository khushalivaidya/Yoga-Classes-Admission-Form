import { Box, Button, Grid, TextField, Alert } from "@mui/material";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { createFeesRecordApi } from "../utils/ApiRequests";

const SignUpForm = ({ email, feeRecordFound, setFeeRecordFound }) => {
    const [userEnteredInfo, setUserEnteredInfo] = useState({
        email: email,
        name: "",
        age: "",
        batch: "",
    });
    const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);
    const [isPaymentDone, setIPaymentDone] = useState(false);

    const [statusMessage, setStatusMessage] = useState(
        "Enter Details & Make Payment to Sign up for Yoga Classes"
    );
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setUserEnteredInfo({
            ...userEnteredInfo,
            [e.target.name]: e.target.value,
        });
    };

    const createFeesRecord = async () => {
        try {
            const response = await axios.post(createFeesRecordApi, {
                email: userEnteredInfo.email,
                name: userEnteredInfo.name,
                age: userEnteredInfo.age,
                batch: userEnteredInfo.batch,
            });

            if (response.data.success) {
                setIPaymentDone(true);
                setStatusMessage("Payment Successfull");
                setFeeRecordFound(true);
                setIsError(false);
                setErrorMessage("");
            } else {
                setIsError(true);
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setIsError(true);
            setErrorMessage(error.message);
        }
    };

    const handleMakePayment = () => {
        setIsPaymentInitiated(true);
        setStatusMessage("Payment Initialized");
        createFeesRecord();
    };

    return (
        <div className="container">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <h2>{statusMessage}</h2>
                </Grid>
                {isError && (
                    <Grid item xs={12}>
                        <Alert
                            severity="error"
                            fullWidth
                            sx={{ marginBottom: "5px" }}
                        >
                            {errorMessage}
                        </Alert>
                    </Grid>
                )}
                {!isPaymentInitiated ? (
                    <>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                label="Email"
                                variant="outlined"
                                value={userEnteredInfo.email}
                                disabled={true}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                label="Name"
                                variant="outlined"
                                value={userEnteredInfo.name}
                                onChange={handleChange}
                                name="name"
                                disabled={isPaymentInitiated}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                type="number"
                                label="Age"
                                variant="outlined"
                                value={userEnteredInfo.age}
                                onChange={handleChange}
                                name="age"
                                error={
                                    !userEnteredInfo.age === "" &&
                                    (userEnteredInfo.age < 18 ||
                                        userEnteredInfo.age > 65)
                                }
                                helperText={
                                    !(
                                        userEnteredInfo.age < 18 ||
                                        userEnteredInfo.age > 65
                                    )
                                        ? ""
                                        : "Please Enter age between 18 - 65"
                                }
                                disabled={isPaymentInitiated}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>Batch</InputLabel>
                                <Select
                                    labelId="Batch"
                                    value={userEnteredInfo.batch}
                                    label="Batch"
                                    name="batch"
                                    onChange={handleChange}
                                    disabled={isPaymentInitiated}
                                >
                                    <MenuItem value={1}>6-7 AM</MenuItem>
                                    <MenuItem value={2}>7-8 AM</MenuItem>
                                    <MenuItem value={3}>8-9 AM</MenuItem>
                                    <MenuItem value={4}>5-6 PM</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                disabled={
                                    userEnteredInfo.name === "" ||
                                    userEnteredInfo.age === "" ||
                                    userEnteredInfo.age < 18 ||
                                    userEnteredInfo.age > 65 ||
                                    userEnteredInfo.batch === "" ||
                                    isPaymentInitiated
                                }
                                onClick={handleMakePayment}
                            >
                                Make Payment 500 Rs.
                            </Button>
                        </Grid>
                    </>
                ) : !isPaymentDone ? (
                    <Grid item sx={12} fullWidth>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                width: "450px",
                            }}
                        >
                            <CircularProgress className="spinner" />
                        </Box>
                    </Grid>
                ) : (
                    <></>
                )}
            </Grid>
        </div>
    );
};
export default SignUpForm;
