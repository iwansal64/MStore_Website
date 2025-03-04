import { Student } from "./base";

const authorization_string = "90ySD1y9fH299gH90ChOZgvdasoi";

export function is_email_valid(email: string) {
    if(!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return false;
    }
    return true;
}

export async function manualSignUp({ email }: { email: string }) {
    try {
        const response_register = await (await fetch(Student.RegisterEndpoint, {
            method: "POST",
            headers: {
                "Authorization": authorization_string,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
            }),
        })).json();

        
        if(response_register.result) {
            return {
                success: true,
                data: response_register.result
            }
        }
        else {
            return {
                success: false,
                error: response_register.error_code||response_register.error
            }
        }
    }
    catch (error) {
        console.error(error);
        return {
            success: false,
            error
        }
    }
}

export async function verifyRegistration({ token, password, fullname }: { token: string, password: string, fullname: string }) {
    try {
        const response_verification = await (await fetch(Student.VerifyRegisterEndpoint, {
            method: "POST",
            headers: {
                "Authorization": authorization_string,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "fullname": fullname,
                "password": password,
                "token": token,
            }),
        })).json();

        if(response_verification.result) {
            return {
                success: true,
                data: response_verification.data
            }
        }
        else {
            return {
                success: false,
                error: response_verification.error_code||response_verification.error
            }    
        }
    }
    catch (error) {
        console.error(error);
        return {
            success: false,
            error
        }
    }
}

export async function googleLogin({ next_auth_token, email, fullname }: { next_auth_token: string, email: string, fullname: string }) {
    try {
        const response_login = await (await fetch(Student.GoogleEndpoint, {
            method: "POST",
            headers: {
                "Authorization": authorization_string,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "next_auth_token": next_auth_token,
                "email": email,
                "fullname": fullname
            })
        })).json();

        if(response_login.result) {
            return {
                success: true,
                data: response_login.result
            }
        }
        else {
            return {
                success: false,
                error: response_login.error_code||response_login.error
            }
        }
    }
    catch (error) {
        return {
            success: false,
            error
        };
    }
}

export async function manualLogin({ email, password } : { email: string, password: string }) {
    try {
        const response = await (await fetch(Student.ValidateEndpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": authorization_string,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })).json();

        return {
            success: true,
            response
        };
    }
    catch (error) {
        return {
            success: false,
            error
        };
    }
}

export async function getStudentData() {
    try {
        const response = await (await fetch(Student.GetEndpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": authorization_string,
            },
        })).json();

        if(response.error_code && response.error_code == "004") {
            return {
                success: false,
                server_error: false
            };
        }
    
        if(response.result) {
            const userData = response.result;
            return {
                success: true,
                result: userData
            };
        }
    }
    catch (error) {
        return {
            success: false,
            server_error: true,
            error
        };
    }
}

export async function logoutStudent() {
    try {
        const response = await (await fetch(Student.LogoutEndpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": authorization_string,
            },
        })).json();

        if(response.result) {
            return {
                success: true,
                error: null
            };
        }
        else {
            return {
                success: false,
                error: response.message
            };
        }
    }
    catch (e) {
        return {
            success: false,
            error: e
        };
    }
}