import { getLoginToken } from "../../api/account";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginTrigger() {
  const searchParams = useSearchParams();
  const session = useSession();
  
  //? Get the state of login
  const is_logging_in = localStorage.getItem("is_logging_in");

  //? Get the login search param
  const is_login_param_exist = searchParams.has("login");

  //? If the login param exist (After logging in from next-auth) and there's data that we can process (Data from next-auth) and currently not logging in (To prevent double fetch),
  if(is_login_param_exist && session.data && !is_logging_in) {
    //? Change state of login to 'yes' indicating that we're trying to logging in.
    localStorage.setItem("is_logging_in", "yes");

    //? Get login token from server
    getLoginToken({ auth_data_token: session.data.access_token }).then(result => {
      //? Remove state of login (not logging in)
      localStorage.removeItem("is_logging_in");

      //? If there's no error
      if(result.success) {
        //? Check if the user account's type is an admin
        if(result.is_admin) {
            console.log("SUCCESSFULLY LOGIN AS ADMIN");
            window.location.href = "/admin";
        }
        //? Check if the user account is not registered before
        else if(result.is_register) {
            console.log("SUCCESSFULLY REGISTER STUDENT");
            localStorage.setItem("mitra-register", "yes");
            window.location.href = "/home";
        }
        //? User is already registered before and currently logging in as student
        else {
            console.log("SUCCESSFULLY LOGIN AS STUDENT");
            window.location.href = "/home";
        }
      }
      //? If there's an error
      else {
        console.error(`THERE'S AN ERROR WHEN TRYING TO LOGIN WITH GOOGLE. error: ${result.error}`);
        alert("There's something wrong. Please contact developer.");
        window.location.href = "/";
      }
    });
  }

  return <></>;
}