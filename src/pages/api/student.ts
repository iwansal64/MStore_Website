import { Student } from "./base";

const authorization_string = "90ySD1y9fH299gH90ChOZgvdasoi";

export async function googleSignUp({ next_auth_token, email, fullname }: { next_auth_token: string, email: string, fullname: string }) {
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

export async function manualSignUp({ email, password } : { email: string, password: string }) {
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