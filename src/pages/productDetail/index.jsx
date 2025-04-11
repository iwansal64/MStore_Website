import React, { useEffect, useState } from "react";
import NavigateBar from "../components/navbar";
import { useSearchParams } from "next/navigation";
import { toggleProductFavorite, getWishlistProducts, getProductById } from "../api/product";
import { no_api, number_to_rp } from "../../javascript/client_function";
import strftime from "strftime";
import { FaHeart } from "react-icons/fa";
import { dummy_products } from "../variables/allProduct";

const ProductDetail = () => {
    const searchParams = useSearchParams();
    const productId = searchParams.get("product_id");
    if(!productId) {
        window.location.href = "/home";
    }
    
    const [productData, setProductData] = useState({
        name: "",
        stock: 0,
        image_url: "/default_product.svg",
        createdAt: new Date(),
    });
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if(no_api()) {
            setProductData(dummy_products.find(value => {
                return value.id == productId
            }))
        }
        else {
            getProductById({ product_id: productId }).then(response => {
                if(response.success) {
                    setProductData(response.result);
                }
                else {
                    console.error(response.error);
                    alert("There's an unexpected error occured. please contact developer");
                }
            });
            
            getWishlistProducts().then(response => {
                if(response.success) {
                    setIsFavorite(response.result.map(value => value.id).includes(productId));
                }
            })
        }
    }, []);

    async function handleToggleFavorite() {
        toggleProductFavorite({ product_id: productId }).then(response => {
            if(response.success) {
                setIsFavorite(!isFavorite);
            }
            else {
                console.error(response.error);
                alert("There's an unexpected error occured. please contact developer");
            }
            console.log(response.result);
        })
    }
    
    return <>
        <NavigateBar />
        <div className="flex flex-col w-dvw h-dvh items-center justify-center">
            <div className="p-12 flex gap-4">
                <div>
                    <img src={productData.image_url} alt="The Image of the Product" />
                </div>
                <div>
                    <p className="text-[3rem] font-bold">{productData.name}</p>
                    <p className="text-2xl mt-2">{number_to_rp(productData.price, true)} <span className="text-base opacity-[0.5]">Stok: {productData.stock}</span></p>
                    <p className="text-xs opacity-[0.5]">Date added - {strftime("%d/%m/%Y", productData.createdAt)}</p>
                </div>
            </div>
            <div className="actions flex gap-4">
                <button className="bg-[#ccc] text-black px-7 py-3 rounded-2xl ">Add To Cart</button>
                <button className="bg-[#ccc] text-black px-7 py-3 rounded-2xl ">Buy Now</button>
                <button className="bg-[#ccc] text-black px-7 py-3 rounded-2xl aspect-square w-fit" onClick={handleToggleFavorite}><FaHeart className="w-full h-full" color={isFavorite?"red":"black"} /></button>
            </div>
        </div>
    </>
};

export default ProductDetail;