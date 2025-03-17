"use client";

import { orderProductAPI } from "../api/student";
import NavigateBar from "../components/navbar";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { getProductById } from "../api/product";
import { addToCartAPI } from "../api/cart";

const CheckoutPage = () => {
    const searchParams = useSearchParams();
    const productId = searchParams.get("product_id");
    const cartsId = searchParams.get("carts_id");
    
    async function order_product() {
        const result = await orderProductAPI({ product_id: productId, payment_method: paymentMethod });
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
        created_at: new Date()
    }]);
    const [loaded, setLoaded] = useState(false);
const [paymentMethod, setPaymentMethod] = useState("tunai");

    useEffect(() => {
        if(productId) {
            addToCartAPI({ product_id: productId }).then(response => {
                if(response.success) {
                    setCartsData([response.result])
                    setLoaded(true);
                }
                else {
                    console.error(`There's an error when trying to get product data. Error message: ${response.error}`);
                    alert("Sorry, there's an error. Please contact developer");
                }
            });
        }

    }, []);

    return <>
        <h1>Checkout Page</h1>        
        <div>
            {
            loaded?
            (<>
            {(cartsData.map(cart => <div key={cart.id}>
                <p>Product Name: {cart.product_name}</p>
                <p>Product Price: {cart.product_price}</p>
                <p>Quantity: {cart.quantity}</p>
                <p>Total Price: {cart.product_price * cart.quantity}</p>
            </div>))}
            <div>
                <div>
                    <label htmlFor="payment-method">Payment Method: </label>
                    <select name="payment-method" id="payment-method" className="bg-transparent" onChange={(e) => { setPaymentMethod(e.target.value); }}>
                        <option value="tunai" className="bg-black">Tunai</option>
                        <option value="qris" className="bg-black">QRIS</option>
                    </select>
                </div>
            </div>
            <button className="bg-white text-black px-8 py-2" onClick={order_product}>Checkout!</button>
            </>):
            <h1>Loading...</h1>
            }
        </div>
    </>;
}

export default CheckoutPage;