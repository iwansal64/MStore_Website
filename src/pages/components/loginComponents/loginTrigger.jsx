import { getLoginToken } from "../../api/account";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginTrigger() {
  const searchParams = useSearchParams();
  const session = useSession();
  const is_logging_in = localStorage.getItem("is_logging_in");

  const is_login_param_exist = searchParams.has("login");
  if(is_login_param_exist && session.data && !is_logging_in) {
    localStorage.setItem("is_logging_in", "yes");
    getLoginToken({ auth_data_token: session.data.access_token }).then(result => {
      localStorage.removeItem("is_logging_in");
      if(result.success) {
        if(result.is_admin) {
            console.log("SUCCESSFULLY LOGIN AS ADMIN");
            window.location.href = "/admin";
        }
        else if(result.is_register) {
            console.log("SUCCESSFULLY REGISTER STUDENT");
            localStorage.setItem("mitra-register", "yes");
            window.location.href = "/home";
        }
        else {
            console.log("SUCCESSFULLY LOGIN AS STUDENT");
            window.location.href = "/home";
        }
      }
      else {
        console.error(`THERE'S AN ERROR WHEN TRYING TO LOGIN WITH GOOGLE. error: ${result.error}`);
        alert("There's something wrong. Please contact developer.");
        window.location.href = "/";
      }
    });
  }

  return <></>;
}