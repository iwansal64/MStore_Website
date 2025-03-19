import { Account } from "./base";

const authorization_string = "90ySD1y9fH299gH90ChOZgvdasoi";


export async function getAccountData() {
    try {
        const response = await (await fetch(Account.GetEndpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": authorization_string,
            },
        })).json();
    
        if(response.result) {
            const userData = response.result;
            return {
                success: true,
                result: userData
            };
        }

        console.error(response);
        
        return {
          success: false,
          server_error: false
        };
    }
    catch (error) {
        return {
            success: false,
            server_error: true,
            error
        };
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
                is_admin: response_login.is_admin,
                is_register: response_login.is_register
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
