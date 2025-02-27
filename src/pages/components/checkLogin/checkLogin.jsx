import { useSession } from "next-auth/react";
import { manualSignUp } from "../../api/student";
import { useNavigate } from "react-router-dom";

export default function CheckLogin() {
    const navigate = useNavigate();
    
    const session = useSession();
    const rawUserData = JSON.parse(localStorage.getItem("userData"));
    if(rawUserData || session.data) {
        if(rawUserData.user.password !== null) {
            manualSignUp({
                email: rawUserData.user.email,
                password: rawUserData.user.password,
            }).then(value => {
                if(!value.success) {
                    // Error when trying to logging in.
                    return;
                }

                if(!value.response.result) {
                    // User session data is not correct.
                    return;
                }

                // User has been logged in!
                navigate("/home");
                
            }).catch(error => {
                // There's an error when trying to signing up.
            });
        }
        else if(session.data) {
            // If there's next auth google session data.
            navigate("/home");
        }
    }

    return <></>;
}