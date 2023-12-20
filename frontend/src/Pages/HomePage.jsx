import React, { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Alert, Box } from "@mui/material";
import { getCurrentMonthFeesRecordByEmailApi } from "../utils/ApiRequests";
import SignUpForm from "../Components/SignUpForm";
import FeesRecordCard from "../Components/FeesRecordCard";

const HomePage = (props) => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [feeRecordFound, setFeeRecordFound] = useState(false);
    const [fetchedRecordData, setFetchedRecordData] = useState({
        email: "",
        name: "",
        age: "",
        paymentMonth: "",
        batch: "",
    });

    const handleLogout = () => {
        localStorage.removeItem("user");
        props.setUserInfo(null);
    };

    useEffect(() => {
        if (props.userInfo) {
            getCurrentonthFeeRecordByEmail();
        }
        // eslint-disable-next-line
    }, [props.userInfo, feeRecordFound]);

    const getCurrentonthFeeRecordByEmail = () => {
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: props.userInfo,
                }),
            };

            return fetch(getCurrentMonthFeesRecordByEmailApi, requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    if (data.feesRecord?.length === 0) {
                        setFeeRecordFound(false);
                    } else {
                        setFetchedRecordData(data.feesRecord[0]);
                        setFeeRecordFound(true);
                    }
                });
        } catch (error) {
            setIsError(true);
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <div className="header-bar">
                <h1 style={{ marginLeft: "58px" }}>Yoga Classes</h1>

                {props.userInfo && (
                    <LogoutIcon
                        fontSize="large"
                        className="header-icon"
                        onClick={handleLogout}
                    />
                )}
            </div>
            <Box
                sx={{
                    width: "90%",
                    p: "20px",
                    display: "block",
                    margin: "10px auto",
                }}
            >
                {/* <h2
                    style={{
                        textAlign: "center",
                        color: "rgb(4, 74, 160)",
                        fontFamily: "sans-serif",
                    }}
                >
                    Welcome {props.use?.name}!
                </h2> */}

                {isError && (
                    <Alert
                        severity="error"
                        fullWidth
                        sx={{ marginBottom: "5px" }}
                    >
                        {errorMessage}
                    </Alert>
                )}

                {feeRecordFound ? (
                    <FeesRecordCard
                        email={props.userInfo}
                        fetchedRecordData={fetchedRecordData}
                    />
                ) : (
                    <SignUpForm
                        email={props.userInfo}
                        feeRecordFound={feeRecordFound}
                        setFeeRecordFound={setFeeRecordFound}
                    />
                )}
            </Box>
        </>
    );
};

export default HomePage;
