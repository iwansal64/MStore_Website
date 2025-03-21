import React, { useEffect, useState } from "react";
import NavigateBar from "../components/navbar";
import usePreventBackNavigation from "../hooks/usePreventNavigation";
import { number_to_rp } from "../../javascript/client_function";
import { getWishlistProducts } from "../api/product";
import { Link } from "react-router-dom";

const WishlistPage = () => {
    usePreventBackNavigation();

    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        getWishlistProducts().then(response => {
            if(response.success) {
                setWishlist(response.result);
            }
            else {
                console.error(response.error);
                alert("There's an error occured. Please contact developer");
            }
        })
    }, []);


    return <>
        <NavigateBar />
        <div className="flex flex-col w-dvw h-dvh p-8">
            <h1 className="text-[3rem] font-bold">Wishlist</h1>
            <hr />
            <br />
            <div className="grid grid-cols-3 gap-4">
                {wishlist.length > 0 ? wishlist.map(favorite_product => {
                    return <Link to={`/productDetail?product_id=${favorite_product.id}`} className="p-8 bg-[#222] rounded-xl flex items-center gap-6 text-left duration-200 hover:scale-[1.05] hover:brightness-[0.5]">
                        <img src={favorite_product.image_url} className="w-fit" />
                        <div>
                            <p className="text-3xl font-bold">{favorite_product.name}</p>
                            <p className="text-base">{number_to_rp(favorite_product.price, true)}</p>
                            <p className="text-sm">Stock: {favorite_product.stock}</p>
                        </div>
                    </Link>
                }) : <p className="text-xl">You haven't put anything in the wishlist yet</p>}
            </div>
        </div>
    </>;
};

export default WishlistPage;