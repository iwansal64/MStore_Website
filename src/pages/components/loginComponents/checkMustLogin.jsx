//? This component is as same as checkLogin but if the user is not authorized we redirect the user to login page
import { useNavigate } from "react-router-dom";
import { getAccountData } from "../../api/student";

export default function CheckMustLogin() {
    const navigate = useNavigate();
    
    let userData = JSON.parse(localStorage.getItem("userData"));
    const expire = localStorage.getItem('userDataExpire');
    if(expire && ((new Date()).valueOf() > expire)) {
      localStorage.removeItem("userDataExpire");
      userData = null;
    }

    console.log(userData);
    if(!userData) {
    getAccountData().then(value => {
        if(!value.success) {
            navigate("/");
            return;
        }

        const userData = value.result;

        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("userDataExpire", (new Date()).valueOf() + 60000);
        
        window.location.reload();
      });
    }

    return <></>;
}