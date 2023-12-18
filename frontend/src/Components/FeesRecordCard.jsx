import { Grid } from "@mui/material";
import React from "react";

const FeesRecordCard = ({ email, fetchedRecordData }) => {
    const getMonth = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const getBatch = ["6 - 7 AM", "7 - 8 AM", "8 - 9 AM", "5 - 6 PM"];
    return (
        <div className="container">
            <Grid container textAlign={"left"}>
                <Grid item xs={12}>
                    <h1>Your Payment Record</h1>
                </Grid>
                <Grid item xs={12}>
                    <span>
                        <p>Email: </p>
                        <h3>{email}</h3>
                    </span>
                </Grid>
                <Grid item xs={12}>
                    <p>Name: </p>
                    <h3>{fetchedRecordData.name}</h3>
                </Grid>
                <Grid item xs={6}>
                    <p>Payment valid upto month: </p>
                    <h3>{getMonth[fetchedRecordData.paymentMonth]}</h3>
                </Grid>
                <Grid item xs={6}>
                    <p>Age: </p>
                    <h3>{fetchedRecordData.age}</h3>
                </Grid>
                <Grid item xs={12}>
                    <p>BatchNo. </p>
                    <h3>{getBatch[fetchedRecordData.batch]}</h3>
                </Grid>
            </Grid>
        </div>
    );
};

export default FeesRecordCard;
