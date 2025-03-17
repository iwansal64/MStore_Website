import { getAccountData } from "../../api/account";

export default function CheckLogin() {
    const previous_data = localStorage.getItem("userData");
    
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

    return <></>;
}