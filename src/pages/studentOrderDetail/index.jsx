import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { get_order_group_by_id } from "../api/order";
import CheckMustLogin from "../components/loginComponents/checkMustLogin";
import Loader from "../components/loader";
import strftime from "strftime";
import { get_development_mode, number_to_rp } from "../../javascript/client_function";
import { useRouter } from "next/router";
import { order_histories } from "../variables/orderHistories";

const StudentOrderDetail = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [ordersData, setOrdersData] = useState([{
        product_name: "T SHIRT IT",
        product_price: 10500,
        order_quantity: 10,
        product_image_url: "/default_product.svg"
    }]);
    const [orderStatus, setOrderStatus] = useState(0);
    const [orderId, setOrderId] = useState("as2c21c424c-512v521v35-12rv14124");
    const [orderCreated, setOrderCreated] = useState("2024-10-12T10:00:25Z");
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
    const [studentName, setStudentName] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [pickupTime, setPickupTime] = useState("");
    const [pickupPlace, setPickupPlace] = useState("");

    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        const orderId = searchParams.get("id");
        if(get_development_mode()) {
            const order_data = order_histories.find((value) => value.id == orderId);
            setOrdersData(order_data.products_data.map(order_data => {
                return {
                    product_name: order_data.product_name,
                    product_price: order_data.product_price,
                    order_quantity: order_data.order_quantity,
                    product_image_url: order_data.product_image_url,
                }
            }));
            setPriceDetail(order_data.products_data.map(order_data => {
                return {
                    info: `Subtotal harga barang: ${order_data.product_name}`,
                    price: order_data.product_price*order_data.order_quantity
                }
            }));
            setOrderCreated(order_data.created_at);
            setOrderId(order_data.id);
            setOrderStatus(order_data.status_code)
            setStudentName(order_data.student_name);
            setPickupPlace(order_data.pickup_place);
            setPickupTime(order_data.pickup_time);
            setStudentClass(order_data.class);
            setTimeout(() => {
                setIsLoaded(true);
            }, Math.random() * 3000 + 500);
        }
        else {
            get_order_group_by_id({ order_group_id: orderId }).then(response => {
                if(response.success) {
                    setOrdersData(Array.from(response.result.orders_data).map(order_data => {
                        return {
                            product_name: order_data.product_name,
                            product_price: order_data.product_price,
                            order_quantity: order_data.order_quantity,
                            product_image_url: order_data.product_image_url,
                        }
                    }));
                    setPriceDetail(Array.from(response.result.orders_data).map(order_data => {
                        return {
                            info: `Subtotal harga barang: ${order_data.product_name}`,
                            price: order_data.product_price*order_data.order_quantity
                        }
                    }));
                    setOrderCreated(response.result.order_group_data.created_at);
                    setOrderId(response.result.order_group_data.id);
                    setOrderStatus(response.result.order_group_data.status_code)
                    setStudentName(response.result.order_group_data.student_name);
                    setPickupPlace(response.result.order_group_data.pickup_place);
                    setPickupTime(response.result.order_group_data.pickup_time);
                    setStudentClass("X ELIND 3");
                    setIsLoaded(true);
                    setStudentClass(response.result.student_data.class);
                    console.log(response.result.order_group_data.pickup_place);
                }
                else {
                    alert("There's an error. Please contact developer.");
                }
            })
        }
    }, [])

    return <>
        <CheckMustLogin />
        <div className="p-24">
            <h1 className="text-4xl">Detail Transaksi</h1>
            <hr />
            <br />
            <div className="overflow-y-scroll max-h-[70vh]">
                {isLoaded?<>
                <h3 className="text-2xl font-bold">{orderStatus == 1?"Pesanan Dikonfirmasi Oleh Admin":
                    orderStatus == -1?"Pesanan Dibatalkan":
                    orderStatus == 0?"Menunggu Konfirmasi":"Pesanan Selesai"}</h3>
                <p>No Pesanan : {orderId}</p>
                <p>Tanggal Pembelian : {strftime("%d %B %Y, %H:%M WIB", new Date(orderCreated))}</p>
                <p>Nama Pelajar : {studentName}</p>
                <p>Kelas : {studentClass}</p>
                <p>Tempat Pengambilan : {pickupPlace != "" ? pickupPlace : "-"}</p>
                <p>Waktu Pengambilan : {pickupTime != "" ? pickupTime : "-"}</p>

                <br />
                <h3 className="text-2xl font-bold">Detail Produk</h3>
                <div className="flex flex-col gap-4 mt-4">
                    {ordersData.map(orderData => {
                        return <div className="flex gap-4 items-center">
                            <p className="text-3xl">-</p>
                            <img src={orderData.product_image_url} alt="Product Image" width={100} />
                            <div className="flex flex-col justify-center">
                                <p className="text-2xl">{orderData.product_name}</p>
                                <p className="text-sm opacity-50">{orderData.order_quantity}x {number_to_rp(orderData.product_price, true)}</p>
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
                    <p>{number_to_rp(priceDetail.map(detail => detail.price).reduce((prev, curr) => prev+curr), true)}</p>
                </div>
                </>:<Loader />}
            </div>
            <button className="text-xl font-bold px-6 py-4 bg-white text-black rounded-xl absolute bottom-12 left-50 -translate-x-1/2 hover:opacity-50"  onClick={() => { router.back(); }} >Back</button>
            <button disabled={orderStatus != 0} className="text-xl font-bold px-6 py-4 bg-white text-black rounded-xl absolute bottom-12 left-1/2 -translate-x-1/2 hover:opacity-50 disabled:pointer-events-none disabled:opacity-50">{orderStatus == 0 ? "Cancel Order!" : (orderStatus == 1 ? "Sudah di konfirmasi!" : "Di Cancel")}</button>
        </div>
    </>;
}

export default StudentOrderDetail;