import { getLoginToken } from "../../api/student";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginTrigger() {
  const searchParams = useSearchParams();
  const session = useSession();

  const is_login_param_exist = searchParams.has("login");
  if(is_login_param_exist && session.data) {
    getLoginToken({ nextauth_data_token: session.data.access_token }).then(result => {
      if(result.success) {
        if(result.is_admin) {
            console.log("SUCCESSFULLY LOGIN AS ADMIN");
            window.location.href = "/admin";
        }
        else {
            console.log("SUCCESSFULLY LOGIN AS STUDENT");
            window.location.href = "/home";
        }
      }
      else {
        console.error(`THERE'S AN ERROR WHEN TRYING TO LOGIN WITH GOOGLE. error: ${result.error}`);
        alert("There's something wrong. Please contact developer.");
      }
    });
  }

  return <></>;
}