import { getLoginToken } from "../../api/student";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginTrigger() {
  const searchParams = useSearchParams();
  const session = useSession();

  const is_google_param_exist = searchParams.has("login");
  console.log(session.data);
  if(is_google_param_exist && session.data) {
    console.log(session.data.access_token);
    getLoginToken({ user_data_token: session.data.access_token }).then(result => {
      console.log(result);
      if(result.success) {
        console.log("SUCCESSFULLY LOGIN WITH GOOGLE");
        window.location.href = "/home";
      }
      else {
        console.error(`THERE'S AN ERROR WHEN TRYING TO LOGIN WITH GOOGLE. error: ${result.error}`);
        alert("There's something wrong. Please contact developer.");
      }
    });
  }

  return <></>;
}