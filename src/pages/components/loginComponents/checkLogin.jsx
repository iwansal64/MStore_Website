import { useEffect } from "react";
import { getAccountData } from "../../api/account";
import { get_development_mode } from "../../../javascript/client_function";

export default function CheckLogin() {
    const previous_data = localStorage.getItem("userData");
    
    useEffect(() =>{
        if(get_development_mode()) {
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
            getAccountData().then(value => {
                if(value.success) {
                    const userData = value.result;
                    localStorage.setItem("userData", JSON.stringify(userData));
                    if(!previous_data) {
                        window.location.reload();
                    }
                }
                else {
                    localStorage.removeItem("userData");
                    if(previous_data) {
                        window.location.reload();
                    }
                }
            });
        }
    }, []);

    return <></>;
}