import { getStudentData } from "../../api/student";

export default function CheckLogin() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    const expire = localStorage.getItem('userDataExpire');
    if(expire && ((new Date()).valueOf() > expire)) {
      localStorage.removeItem("userDataExpire");
      userData = null;
    }

    console.log(userData);
    if(!userData) {
      getStudentData().then(value => {
        if(!value.success) {
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