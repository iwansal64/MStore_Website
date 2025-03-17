//? This component is as same as checkLogin but if the user is not authorized we redirect the user to login page
import { useNavigate } from "react-router-dom";
import { getAccountData } from "../../api/account";
import { useEffect } from "react";

export default function CheckMustLogin() {
    const navigate = useNavigate();
    
    useEffect(() => {
        const previous_data = localStorage.getItem("userData");
        getAccountData().then(value => {
            if(!value.success) {
                navigate("/");
                return;
            }
    
            const userData = value.result;
            localStorage.setItem("userData", JSON.stringify(userData));
            
            if(!previous_data) {
                window.location.reload();
            }
        });
    }, []);

    return <></>;
}