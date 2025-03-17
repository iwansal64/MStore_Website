import { Product, Student } from "./base";

const authorization_string = "90ySD1y9fH299gH90ChOZgvdasoi";

export async function getAllProductsAPI() {
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

export async function addProductAPI({ name, price, stock }: { name: string, price: number, stock: number }) {
  const addProductResponse = await (await fetch(Product.AddProductEndpoint, {
    method: "POST",
    credentials: "include",
    headers: {
      "Authorization": authorization_string,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      price: price,
      stock: stock
    })
  })).json();

  if(addProductResponse.result) {
    return {
      success: true,
      result: addProductResponse.result
    }
  }
  else {
    return {
      success: false,
      error: addProductResponse.error_code || addProductResponse.error
    }
  }
}

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

export async function deleteProductAPI({ product_id }: { product_id: string }) {
    //? Request from get cart endpoint
    const deleteProductResponse = await (await fetch(Product.DeleteProduct, {
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


    //? Check if the result is success or not
    if(deleteProductResponse.result) {
        return {
            success: true,
            result: deleteProductResponse.result
        };
    }
    else {
        return {
            success: false,
            error: deleteProductResponse.error_code || deleteProductResponse.error
        };
    }
}