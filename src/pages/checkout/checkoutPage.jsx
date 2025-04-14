"use client";

import { orderProductAPI } from "../api/student";
import React, { useEffect, useState } from "react";
import { addToCartAPI, getCartAPI } from "../api/cart";
import { get_development_mode } from "../../javascript/client_function";
import { dummy_products } from "../variables/allProduct";
import { carts_data } from "../variables/itemsCart";

const CheckoutPage = () => {
    const productId = localStorage.getItem("checkout_product_id");
    const cartsId = JSON.parse(localStorage.getItem("checkout_carts_id"));

    const is_development_mode = get_development_mode();
    
    if((!productId && (!cartsId || typeof cartsId !== "object" || (typeof cartsId === "object" && cartsId.length == 0)))) {
        window.location.href = "/home";
        return <></>;
    }
    
    async function order_product() {
        const ready_products_id = [...(cartsData.map(cart => cart.product_id))];
        if(productId) {
            ready_products_id.push(productId);
        }

        const ready_order_quantities = [...(cartsData.map(cart => cart.quantity))];
        if(productId) {
            ready_order_quantities.push(1);
        }

        const result = await orderProductAPI({ products_id: ready_products_id, order_quantities: ready_order_quantities, payment_method: paymentMethod, carts_id: cartsId });
        if(result.success) {
            alert("Successfully order product!");
            window.location.href = "/home";
        }
        else {
            console.error(result);
            alert("There's something wrong when trying to order product!");
        }
    }

    const [cartsData, setCartsData] = useState([{
        id: "",
        student_id: "",
        product_id: "",
        product_name: "",
        product_price: 0,
        quantity: 0,
        product_image_url: "",
        created_at: new Date(),
        admin_id: ""
    }]);
    const [loaded, setLoaded] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("tunai");

    useEffect(() => {
        if(is_development_mode) {
            if(productId) {
                const product_data = dummy_products.find(value => value.id == productId);
                setCartsData([{
                    admin_id: 0,
                    student_id: 0,
                    created_at: new Date("2025-02-01T12:52:28"),
                    id: 0,
                    product_id: product_data.id,
                    product_image_url: product_data.image_url,
                    product_name: product_data.name,
                    product_price: product_data.price,
                    quantity: 1,
                }])
            }
            else {
                const products_data = carts_data.filter(value => (value.id in cartsId));
                const result = products_data.map(product_data => {
                    return {
                        admin_id: 0,
                        student_id: 0,
                        created_at: new Date("2025-02-01T12:52:28"),
                        id: 0,
                        product_id: product_data.id,
                        product_image_url: product_data.product_image_url,
                        product_name: product_data.product_name,
                        product_price: product_data.product_price,
                        quantity: product_data.quantity,
                    }
                });
                setCartsData(result)
            }

            setTimeout(() => {
                setLoaded(true);
            }, Math.random() * 2000 + 500);
        }
        else {
            if(productId) {
                addToCartAPI({ product_id: productId }).then(response => {
                    if(response.success) {
                        setCartsData([response.result])
                        setLoaded(true);
                        console.log();
                    }
                    else {
                        console.error(`There's an error when trying to get product data. Error message: ${response.error}`);
                        alert("Sorry, there's an error. Please contact developer");
                    }
                });
            }
            else {
                getCartAPI().then(response => {
                    if(response.success) {
                        setCartsData(response.result.filter(value => Array.from(cartsId).includes(value.id)));
                        setLoaded(true);
                    }
                    else {
                        console.error(`There's an error when trying to get product data. Error message: ${response.error}`);
                        alert("Sorry, there's an error. Please contact developer");
                    }
                })
            }
        }
    }, []);

    return <>
        <h1 className="text-[1.5rem] w-full h-8 text-center mt-4">Checkout Page</h1>        
        <div className="flex flex-col">
            {
            loaded?
            (<>
            <div className="mt-4 flex flex-row items-stretch gap-5">
                {(() => {
                    let current_admin_id = cartsData[0].admin_id;
                    return cartsData.map(cart => {
                        let result = <>{(current_admin_id != cart.admin_id) ? <div className="bg-white w-1" /> : ""}
                            <div key={cart.id} className={"bg-[#333] p-4 "+cart.admin_id}>
                                <p>Product Name: {cart.product_name}</p>
                                <p>Product Price: {cart.product_price}</p>
                                <p>Quantity: {cart.quantity}</p>
                                <p>Total Price: {cart.product_price * cart.quantity}</p>
                            </div>
                        </>;
                        current_admin_id = cart.admin_id;

                        return result
                    })
                })()}
            </div>
            <div className="mt-4">
                <div>
                    <label htmlFor="payment-method" className="mr-4">Payment Method: </label>
                    <select name="payment-method" id="payment-method" className="bg-transparent w-fit px-4 py-1 border border-white rounded-md" onChange={(e) => { setPaymentMethod(e.target.value); }}>
                        <option value="tunai" className="bg-black">Tunai</option>
                        <option value="qris" className="bg-black">QRIS</option>
                    </select>
                </div>
            </div>
            <button className="mt-4 w-fit bg-white text-black px-8 py-2" onClick={order_product}>Checkout!</button>
            </>):
            <h1>Loading...</h1>
            }
        </div>
    </>;
}

export default CheckoutPage;