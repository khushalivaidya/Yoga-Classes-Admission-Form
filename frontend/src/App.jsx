import "./App.css";
import react, { useEffect, useState } from "react";
import VerifyEmail from "./Components/VerifyEmail";
import HomePage from "./Pages/HomePage";
import backgroundImage from "./Images/20800062.jpg";

const App = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            setUserInfo(null);
        } else {
            const obj = JSON.parse(user);
            setUserInfo(obj);
        }
    }, []);

    return (
        <div
            className="App"
            style={
                {
                    // backgroundImage: `url(${backgroundImage})`,
                    // backgroundSize,
                    // backgroundPosition: top,
                    // background: cover,
                }
            }
        >
            {!userInfo ? (
                <VerifyEmail userInfo={userInfo} setUserInfo={setUserInfo} />
            ) : (
                <HomePage userInfo={userInfo} setUserInfo={setUserInfo} />
            )}
            {/* <HomePage userInfo={userInfo} setUserInfo={setUserInfo} /> */}
        </div>
    );
};

export default App;
