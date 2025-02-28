import { useSession } from "next-auth/react";
import { getStudentData, googleSignUp, manualSignUp } from "../../api/student";
import { useNavigate } from "react-router-dom";

export default function CheckLogin() {
    const navigate = useNavigate();
    
    const session = useSession();
    const rawUserData = JSON.parse(localStorage.getItem("userData"));
    if(rawUserData || session.data) {
        try {
            if(rawUserData.user === null && !session.data) {
                // If there's no user data and there's no next auth google session data.
                getStudentData().then(value => {
                    if(!value.success || value.error) {
                        return;
                    }

                    const result = value.result;
                    localStorage.setItem("userData", JSON.stringify(result));
                });
            }
        }
        catch (error) {
            // There's an error when checking password from rawUserData
        }
    }

    return <></>;
}