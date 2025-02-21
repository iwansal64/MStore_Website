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

        console.log(response);

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

        console.log(response);

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