import { getAccountData } from "../../api/account";

export default function CheckLogin() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    const expire = localStorage.getItem('userDataExpire');
    if(expire && ((new Date()).valueOf() > expire)) {
      localStorage.removeItem("userDataExpire");
      userData = null;
    }

    if(!userData) {
      getAccountData().then(value => {
        if(!value.success) {
          return;
        }

        const userData = value.result;

        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("userDataExpire", (new Date()).valueOf() + 1000 * 60 * 60); //? Expires in 1 hour
        
        window.location.reload();
      });
    }

    return <></>;
}