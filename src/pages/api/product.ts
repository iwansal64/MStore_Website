import { Product } from "./base";

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
