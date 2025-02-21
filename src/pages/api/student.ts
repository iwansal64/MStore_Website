import { Student } from "./base";

export async function googleSignUp({ email, name }: { email: string, name: string }) {
    try {
        const response = await (await fetch(Student.RegisterEndpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": "90ySD1y9fH299gH90ChOZgvdasoi",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "fullname": name,
                "email": email
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

export async function manualSignUp({ email, password } : { email: string, password: string }) {
    try {
        const response = await (await fetch(Student.ValidateEndpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": "90ySD1y9fH299gH90ChOZgvdasoi",
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
                "Authorization": "90ySD1y9fH299gH90ChOZgvdasoi",
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
                "Authorization": "90ySD1y9fH299gH90ChOZgvdasoi",
            },
        })).json();

        if(response.result) {
            return {
                success: true,
                error: null
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