import { Admin } from "./base";

const authorization_string = "90ySD1y9fH299gH90ChOZgvdasoi";

export async function get_admin_stats() {
    const response = await (await fetch(Admin.GetAdminStats, {
        method: "POST",
        credentials: "include",
        headers: {
            "Authorization": authorization_string
        }
    })).json();

    if(response.result) {
        return {
            success: true,
            result: response.result,
        }
    }
    else {
        return {
            success: false,
            error: response.error || response.error_code,
        }
    }
}