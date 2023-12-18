import { Grid } from "@mui/material";
import React, { useMemo } from "react";

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
                    <h3>Email: {email}</h3>
                </Grid>
                <Grid item xs={12}>
                    <h3>Name: {fetchedRecordData.name}</h3>
                </Grid>
                <Grid item xs={6}>
                    <h3>
                        Payment valid upto month:{" "}
                        {getMonth[fetchedRecordData.paymentMonth]}
                    </h3>
                </Grid>
                <Grid item xs={6}>
                    <h3>Age: {fetchedRecordData.age}</h3>
                </Grid>
                <Grid item xs={12}>
                    <h3>BatchNo. {getBatch[fetchedRecordData.batch]}</h3>
                </Grid>
            </Grid>
        </div>
    );
};

export default FeesRecordCard;
