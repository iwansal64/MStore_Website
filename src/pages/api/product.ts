import { Product } from "./base";

const authorization_string = "90ySD1y9fH299gH90ChOZgvdasoi";

export async function getAllProducts() {
    try {
        const productResponse = await (await fetch(Product.GetAllProductEndpoint, {
            method: "POST",
            headers: {
                "Authorization": authorization_string
            }
        })).json();

        if(productResponse.result) {
            return {
                success: true,
                result: productResponse.result
            };
        }
        else {
            return {
                success: false,
                error: productResponse.error || productResponse.error_code
            };
        }
    }
    catch (error) {
        console.error(error);
        return {
            success: false,
            error
        };
    }
}