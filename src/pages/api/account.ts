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