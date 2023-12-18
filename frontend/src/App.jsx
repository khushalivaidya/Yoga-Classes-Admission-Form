import "./App.css";
import { useEffect, useState } from "react";
import VerifyEmail from "./Components/VerifyEmail";
import HomePage from "./Pages/HomePage";

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
        <div className="App">
            {!userInfo ? (
                <VerifyEmail userInfo={userInfo} setUserInfo={setUserInfo} />
            ) : (
                <HomePage userInfo={userInfo} setUserInfo={setUserInfo} />
            )}
        </div>
    );
};

export default App;
