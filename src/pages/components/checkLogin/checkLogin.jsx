import { useSession } from "next-auth/react";
import { manualSignUp } from "../../api/student";
import { useNavigate } from "react-router-dom";

export default function CheckLogin() {
    const navigate = useNavigate();
    
    const session = useSession();
    const rawUserData = JSON.parse(localStorage.getItem("userData"));
    if(rawUserData || session.data) {
        try {
            if(rawUserData.user !== null || session.data) {
                // If there's user data or there's next auth google session data.
                navigate("/home");
            }
        }
        catch (error) {
            // There's an error when checking password from rawUserData
        }
    }

    return <></>;
}