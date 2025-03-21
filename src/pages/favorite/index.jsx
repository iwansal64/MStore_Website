import React, { useState } from "react";
import NavigateBar from "../components/navbar";
import usePreventBackNavigation from "../hooks/usePreventNavigation";
import { number_to_rp } from "../../javascript/client_function";

const FavoritePage = () => {
    usePreventBackNavigation();

    const [favorites, setFavorites] = useState([
        {
            product_image_url: "/default_product.svg",
            product_name: "POLO IT",
            product_price: 25200,
            product_stock: 6
        },
        {
            product_image_url: "/default_product.svg",
            product_name: "Dasi",
            product_price: 215815,
            product_stock: 7
        },
        {
            product_image_url: "/default_product.svg",
            product_name: "Mouse IT",
            product_price: 95212,
            product_stock: 29
        },
        {
            product_image_url: "/default_product.svg",
            product_name: "Monitor IT",
            product_price: 12992,
            product_stock: 20
        },
        {
            product_image_url: "/default_product.svg",
            product_name: "Kabel HDMI",
            product_price: 82922,
            product_stock: 40
        },
    ])

    return <>
        <NavigateBar />
        <div className="flex flex-col w-dvw h-dvh p-8">
            <h1 className="text-[3rem] font-bold">Wishlist</h1>
            <hr />
            <br />
            <div className="grid grid-cols-3 gap-4">
                {favorites.map(favorite_product => {
                    return <button className="p-8 bg-[#222] rounded-xl flex items-center gap-6 text-left duration-200 hover:scale-[1.05] hover:brightness-[0.5]">
                        <img src={favorite_product.product_image_url} className="w-fit" />
                        <div>
                            <p className="text-3xl font-bold">{favorite_product.product_name}</p>
                            <p className="text-base">{number_to_rp(favorite_product.product_price, true)}</p>
                            <p className="text-sm">Stock: {favorite_product.product_stock}</p>
                        </div>
                    </button>
                })}
            </div>
        </div>
    </>;
};

export default FavoritePage;