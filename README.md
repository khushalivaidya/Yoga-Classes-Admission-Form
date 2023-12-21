# Yoga Classes Admission Form

Deployment Link: https://yoga-classes-admission-form.vercel.app/

## Project Description

-   It is an application to sign up and view current subscription to the Yoga Classes that happen every month.
-   It includes authentication of user using email verification using OTP.

## Features

-   User Authentication using email OTP.
-   User can view their subcription to yoga classes for current month.
-   If user hasn't subscribed to yoga sessions for this month, they can sign up by filling admission form.
-   Users can sign up only if thy fall within age group of 18-65.
-   An individual will have to pay the fees every month and he/she can pay it any time of the month.
-   Fees payment is completed by payment of 500 Rs. for whole month all at once. (Payment Function is dummy)

## Entity - Relationship Diagram of the database

![ER Diagram](Yoga%20Classes%20ERD.png)

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in backend folder create config folder and add `config.env` file in it and all env variables there.

#### Environment variables related to the email account used for sending OTPs and Notifications

If you are using gmail, enable 2 Step Verification

-   `MAIL_HOST` : Your email host, generally `smtp.gmail.com` for gmail.
-   `MAIL_USER` : Your email username
-   `MAIL_PASS` : Your email password, incase of gmail it is App Password in the 2 Step Verification of your account.

#### Server related environment variables

-   `MONGO_URL` : Your MongoDB connection string
-   `PORT` : Port number

#### Allowed Origins
- `FRONTEND_URL` : Your localhost or Deployed frontend link

## Run Locally

Clone the project

```bash
  git clone https://github.com/khushalivaidya/Yoga-Classes-Admission-Form.git
```

Go to the project directory

```bash
  cd Yoga Classes Admission Form
```

Go to the backend directory and Install dependencies

```bash
  cd backend
```

```bash
  npm install
```

Start the backend server

```bash
  npm run server
```

Go to the frontend directory and Install dependencies

```bash
  cd frontend
```

```bash
  npm install
```

Start the frontend server

```bash
  npm start
```

## Tech Stack

**Client:** React.js, Material-UI

**Server:** Node.js, Express.js

**Database:** MongoDB Atlas

**Testing:** Postman

## Designed and Implemented By

### Khushali Vaidya

-   [Github](https://github.com/khushalivaidya)
-   [LinkedIn](https://www.linkedin.com/in/khushalivaidya/)
