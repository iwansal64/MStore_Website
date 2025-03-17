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

export async function editProductAPI({ product_id, name, price, stock }: { product_id: string, name: string, price: number, stock: number }) {
    const editProductResponse = await (await fetch(Product.UpdateProductEndpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "Authorization": authorization_string,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_id: product_id,
          name: name,
          price: price,
          stock: stock
        })
      })).json();
    
      if(editProductResponse.result) {
        return {
          success: true,
          result: editProductResponse.result
        }
      }
      else {
        return {
          success: false,
          error: editProductResponse.error_code || editProductResponse.error
        }
      }
}