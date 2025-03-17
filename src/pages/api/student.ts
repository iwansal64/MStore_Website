import { signOut } from "next-auth/react";
import { Account, Student } from "./base";

const authorization_string = "90ySD1y9fH299gH90ChOZgvdasoi";

export function is_email_valid(email: string) {
    if(!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return false;
    }
    return true;
}

export async function manualSignUp({ email }: { email: string }) {
    try {
        const response_register = await (await fetch(Account.RegisterEndpoint, {
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
        const response_verification = await (await fetch(Account.VerifyRegisterEndpoint, {
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

export async function getLoginToken({ auth_data_token }: { auth_data_token: string }) {
    try {
        const response_login = await (await fetch(Account.LoginEndpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": authorization_string,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                auth_data_token: auth_data_token
            })
        })).json();

        if(response_login.result) {
            return {
                success: true,
                data: response_login.result,
                is_admin: response_login.is_admin
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
        const response = await (await fetch(Account.ValidateEndpoint, {
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

export async function logoutAPI() {
    localStorage.clear();
    signOut({
        callbackUrl: "/"
    });
    
    try {
        const response = await (await fetch(Account.LogoutEndpoint, {
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

export async function updateStudent({ username, date_of_birth, gender, generation }: { username: string|undefined, date_of_birth: Date|undefined, gender: boolean|undefined, generation: number|undefined }) {
    try {
        const response = await (await fetch(Student.UpdateEndpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authorization_string
            },
            body: JSON.stringify({
                username: username,
                date_of_birth: date_of_birth,
                gender: gender,
                generation: generation
            })
        })).json();

        if(response.result) {
            return {
                success: true,
                result: response.result
            };
        }
        else {
            return {
                success: false,
                error: response.error || response.error_code
            };
        }
    }
    catch(e) {
        return {
            success: false,
            error: e
        };
    }
}

export async function orderProductAPI({ product_id }: { product_id: string }) {
    const orderProductResponse = await (await fetch(Student.OrderProductEndpoint, {
        method: "POST",
        credentials: "include",
        headers: {
            "Authorization": authorization_string,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            product_id: product_id,
            payment_method: "tunai"
        })
    })).json();
    
    if(orderProductResponse.result) {
        return {
            success: true,
            result: orderProductResponse.result
        }
    }
    else {
        return {
            success: false,
            error: orderProductResponse.error_code || orderProductResponse.error
        }
    }
}