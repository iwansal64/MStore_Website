import { Student } from "./base";

const authorization_string = "90ySD1y9fH299gH90ChOZgvdasoi";

export async function addToCartAPI({ product_id }: { product_id: string }) {
    const addToCartResponse = await (await fetch(Student.AddToCartEndpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        "Authorization": authorization_string,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_id: product_id
      })
    })).json();
  
    if(addToCartResponse.result) {
        return {
            success: true,
            result: addToCartResponse.result
        }
    }
    else {
        return {
            success: false,
            error: addToCartResponse.error_code || addToCartResponse.error
        }
    }
}

export async function getCartAPI() {
    //? Request from get cart endpoint
    const getCartResponse = await (await fetch(Student.GetCartEndpoint, {
        method: "POST",
        credentials: "include",
        headers: {
            "Authorization": authorization_string,
        }
    })).json();


    //? Check if the result is success or not
    if(getCartResponse.result) {
        return {
            success: true,
            result: getCartResponse.result
        };
    }
    else {
        return {
            success: false,
            error: getCartResponse.error_code || getCartResponse.error
        };
    }
}

export async function changeQuantityCartAPI({ cart_id, quantity_changes, is_set = false }: { cart_id: string, quantity_changes: number, is_set: boolean }) {
    //? Request from get cart endpoint
    const getCartResponse = await (await fetch(Student.ChangeCartQuantityEndpoint, {
        method: "POST",
        credentials: "include",
        headers: {
            "Authorization": authorization_string,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cart_id: cart_id,
            quantity_changes: quantity_changes,
            is_set: is_set
        })
    })).json();


    //? Check if the result is success or not
    if(getCartResponse.result) {
        return {
            success: true,
            result: getCartResponse.result
        };
    }
    else {
        return {
            success: false,
            error: getCartResponse.error_code || getCartResponse.error
        };
    }
}

export async function deleteCartAPI({ cart_id }: { cart_id: string }) {
    //? Request from get cart endpoint
    const getCartResponse = await (await fetch(Student.ChangeCartQuantityEndpoint, {
        method: "POST",
        credentials: "include",
        headers: {
            "Authorization": authorization_string,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cart_id: cart_id,
            is_delete: true
        })
    })).json();


    //? Check if the result is success or not
    if(getCartResponse.result) {
        return {
            success: true,
            result: getCartResponse.result
        };
    }
    else {
        return {
            success: false,
            error: getCartResponse.error_code || getCartResponse.error
        };
    }
}