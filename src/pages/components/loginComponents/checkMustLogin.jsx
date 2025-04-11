//? This component is as same as checkLogin but if the user is not authorized we redirect the user to login page
import { useNavigate } from "react-router-dom";
import { getAccountData } from "../../api/account";
import { useEffect } from "react";
import { no_api } from "../../../javascript/client_function";

export default function CheckMustLogin() {
    const navigate = useNavigate();
    
    useEffect(() => {
        if(no_api()) {
            localStorage.setItem("userData", JSON.stringify({
                "id":"0",
                "email":"dummy@dummy.dummy",
                "phone_number":null,
                "fullname":"Dummy Student",
                "date_of_birth":"1000-10-10T00:00:00.000Z",
                "gender":true,
                "generation":10,
                "username":"Dummy Student",
                "image_url":null,
                "class":"X ELIND 10",
                "balance":10,
                "last_login":"1000-10-10T10:10:10.100Z",
                "created_at":"1000-01-10T08:11:10.100Z"
            }));
        }
        else {
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
        }
    }, []);

    return <></>;
}