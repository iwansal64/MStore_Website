import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { get_order_by_id } from "../api/order";
import strftime from "strftime";
import { number_to_rp } from "../../javascript/client_function";


const OrderDetail = () => {
    const searchParams = useSearchParams();

    const [ordersData, setOrdersData] = useState([{
        product_name: "T SHIRT IT",
        product_price: 10500,
        order_quantity: 10,
        product_image_url: "/default_product.svg"
    }]);
    const [orderStatus, setOrderStatus] = useState(0);
    const [orderId, setOrderId] = useState("as2c21c424c-512v521v35-12rv14124");
    const [orderCreated, setOrderCreated] = useState("2024-10-12T10:00:25Z");
    const [totalPrice, setTotalPrice] = useState(106250);
    const [priceDetail, setPriceDetail] = useState([
        {
            info: "Biaya layanan",
            price: 1250
        },
        {
            info: "Subtotal harga barang",
            price: 105000
        }
    ])

    useEffect(() => {
        const orderId = searchParams.get("id");
        
        // get_order_by_id({ order_id: orderId }).then(response => {
        //     if(response.success) {
        //         setOrderData(response.result);
        //     }
        //     else {
        //         alert("There's an error. Please contact developer.");
        //     }
        // })
    }, [])
    
    return <>
        <div className="p-24">
            <h1 className="text-4xl">Detail Transaksi</h1>
            <hr />

            <br />
            <h3 className="text-2xl font-bold">{orderStatus == 1?"Pesanan Dikonfirmasi Oleh Admin":
                orderStatus == -1?"Pesanan Dibatalkan":
                orderStatus == 0?"Menunggu Konfirmasi":"Pesanan Selesai"}</h3>
            <p>No Pesanan : {orderId}</p>
            <p>Tanggal Pembelian : {strftime("%d %B %Y, %H:%M WIB", new Date(orderCreated))}</p>

            <br />
            <h3 className="text-2xl font-bold">Detail Produk</h3>
            <div className="flex flex-col gap-4 mt-4">
                {ordersData.map(orderData => {
                    return <div className="flex gap-4 items-center">
                        <p className="text-3xl">-</p>
                        <img src={orderData.product_image_url} alt="Product Image" width={100} />
                        <div className="flex flex-col justify-center">
                            <p className="text-2xl">{orderData.product_name}</p>
                            <p className="text-sm opacity-50">{orderData.order_quantity}x {orderData.product_price}</p>
                        </div>
                    </div>;
                })}
            </div>

            <br />
            <h3 className="text-2xl font-bold">Detail Harga</h3>
            <div>
                {priceDetail.map(detail => {
                    return <p>{number_to_rp(detail.price, true)} <span className="opacity-50">({detail.info})</span></p>
                })}
                <div className="flex relative w-fit mt-1">
                    <hr className="w-24" />
                    <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-full">+</span>
                </div>
                <p>{number_to_rp(totalPrice, true)}</p>
            </div>
            

            <button className="text-xl font-bold px-6 py-4 bg-white text-black rounded-xl absolute bottom-12 left-1/2 -translate-x-1/2 hover:opacity-50">Konfirmasi Order!</button>
        </div>
    </>
};

export default OrderDetail;
