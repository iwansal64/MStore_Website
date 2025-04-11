import { FaTrashCan, FaMinus, FaPlus } from "react-icons/fa6";
import NavigateBar from "../components/navbar";
import { useEffect, useState } from "react";
import { changeQuantityCartAPI, deleteCartAPI, getCartAPI } from "../api/cart";
import { no_api, number_to_rp } from "../../javascript/client_function";
import { carts_data } from "../variables/itemsCart";

const KeranjangBelanja = () => {
  const [allCarts, setAllCarts] = useState([]); // Array untuk menampung data semua keranjang untuk akun pelajar yang sedang terhubung
  const [quantity, setQuantity] = useState(0); // Number untuk menampung quantity dari keranjang yang mau diubah (mengubah jumlah keranjang menggunakan input number)
  const [choosenCarts, setChoosenCarts] = useState([]); // Array untuk menampung ID keranjang yang ingin di checkout
  const [prices, setPrices] = useState([]); // Array untuk menampung harga total masing" keranjang yang ingin di checkout
  const [productsName, setProductsName] = useState([]) // Array untuk menampung nama produk yang ada di keranjang yang ingin di checkout

  // Fungsi untuk menambah jumlah
  const handleIncrement = async ({ cart_id }) => {
    if(no_api()) {
        setAllCarts(allCarts.map((value) => {
            return {
                id: value.id,
                product_name: value.product_name,
                product_price: value.product_price,
                product_stock: value.product_stock,
                product_image_url: value.product_image_url,
                created_at: value.created_at,
                quantity: value.quantity + (value.id == cart_id ? 1 : 0)
            }
        }));
    }
    else {
        const result = await changeQuantityCartAPI({ cart_id: cart_id, quantity_changes: 1 });
        if(result.success) {
          window.location.reload();
        }
        else {
          console.error(result.error);
        }
    }
  };

  // Fungsi untuk mengurangi jumlah
  const handleDecrement = async ({ cart_id }) => {
    if(no_api()) {
        setAllCarts(allCarts.map((value) => {
            return {
                id: value.id,
                product_name: value.product_name,
                product_price: value.product_price,
                product_stock: value.product_stock,
                product_image_url: value.product_image_url,
                created_at: value.created_at,
                quantity: value.quantity - (value.id == cart_id ? 1 : 0)
            }
        }));
    }
    else {
        const result = await changeQuantityCartAPI({ cart_id: cart_id, quantity_changes: -1 });
        if(result.success) {
          window.location.reload();
        }
        else {
          console.error(result.error);
        }
    }
  };

  // Fungsi untuk mengubah jumlah
  const handleChangeQuantity = async ({ cart_id }) => {
    if(no_api()) {
        setAllCarts(allCarts.map((value) => {
            return {
                id: value.id,
                product_name: value.product_name,
                product_price: value.product_price,
                product_stock: value.product_stock,
                product_image_url: value.product_image_url,
                created_at: value.created_at,
                quantity: value.id == cart_id ? quantity : value.quantity
            }
        }));
    }
    else {
        const result = await changeQuantityCartAPI({ cart_id: cart_id, quantity_changes: quantity, is_set: true });
        if(result.success) {
          window.location.reload();
        }
        else {
          console.error(result.error);
        }
    }
  }

  // Fungsi untuk membuang produk dari keranjang 
  const handleDelete = async ({ cart_id }) => {
    console.log("TEST");
    if(no_api()) {
        setAllCarts(allCarts.filter((value) => value != cart_id))
    }
    else {
        const result = await deleteCartAPI({ cart_id: cart_id });
        if(result.success) {
            window.location.reload();
        }
        else {
            console.error(result.error);
        }
    }
  }
  
  // Fungsi untuk menambahkan keranjang ke daftar yang ingin id checkout
  const addToCheckoutList = async ({ cart_id }) => {
    // If there's already the cart_id inside the choosenCarts, remove the cart from choosenCarts
    const cartData = allCarts.find(cart => cart.id == cart_id);
    const cartTotalPrice = cartData.product_price * cartData.quantity;
    const cartProductName = cartData.product_name;

    if(choosenCarts.includes(cart_id)) {
        setChoosenCarts(choosenCarts.filter(value => value != cart_id));
        setPrices(prices.filter(value => value != cartTotalPrice));
        setProductsName(productsName.filter(value => value != cartProductName));
    }
    // If not, append the cart_id to the choosenCarts
    else {
        setChoosenCarts([cart_id, ...choosenCarts]);
        setPrices([cartTotalPrice, ...prices]);
        setProductsName([cartProductName, ...productsName]);
    }
  }

  // Fungsi untuk checkout
  const handleCheckout = async () => {
    localStorage.setItem("checkout_carts_id", JSON.stringify(choosenCarts));
    localStorage.removeItem("checkout_product_id");
    window.location.href = "/checkout";
  }

  // Update allCarts data
  useEffect(() => {
    if(no_api()) {
        setQuantity(0),
        setAllCarts(carts_data)
    }
    else {
        getCartAPI().then(result => {
            if(result.success) {
              setQuantity(result.result.quantity);
              setAllCarts(result.result);
            }
            else {
              console.error(`There's an error from server when trying to get cart data. Error: ${result.error}`);
            }
        }).catch(error => {
            console.error(`There's an error from client when trying to get cart data. Error: ${result.error}`);
        });
    }
  }, []);


  return (
    <>
      <NavigateBar is_must_login={true} />
      <div className="max-w-7xl mx-auto">
        <div id="title" className="text-white ">
          <h1>Keranjang Belanja</h1>
        </div>
        <div id="keranjangDanDetail" className="flex flex-row w-full gap-12">
            <div
            id="containerKeranjang"
            className="flex flex-col gap-4 items-center w-full"
            >
            {allCarts.map((cart) => (
                <div
                key={cart.id}
                id="cardListProduct"
                className="flex flex-row items-end border border-white rounded-lg w-full px-6 py-2 relative"
                >
                {/* Items */}
                <div className="flex flex-row gap-4 content-start items-center w-full h-full">
                    <input type="checkbox" name="check" id="check" className="h-1/5 aspect-square m-0" onChange={() => {
                        addToCheckoutList({ cart_id: cart.id });
                    }} />
                    <img src={cart.product_image_url} className="w-30 h-30 mx-0" alt="" />
                    {/* Title and Price */}
                    <h1 className="text-xl text-white h-fit">{cart.product_name}</h1>
                    {/* End Title and Price */}
                </div>
                {/* End Items */}
                <div className="flex flex-col gap-4 items-end w-4/5">
                    <div className="flex flex-row items-center justify-between w-fit gap-4">
                        <div>
                            <p className="text-sm text-gray-300">Price: Rp. {number_to_rp(cart.product_price)}</p>
                            <div className="flex flex-col">
                            <p className="text-sm text-gray-300">Total: </p>
                            <div className="flex flex-col items-end">
                                <p className="text-sm text-gray-300">Rp. {number_to_rp(cart.product_price)}</p>
                                <p className="text-sm text-gray-300">x{cart.quantity}</p>
                                <hr className="bg-white w-full" />
                                <p className="text-lg text-gray-300">Rp. {number_to_rp(cart.product_price * cart.quantity)}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                    {/* Add Quantity */}
                    <div className="text-white flex flex-row gap-4 items-center justify-center">
                        <button onClick={() => {
                            handleDelete({ cart_id: cart.id });
                        }}> 
                            <FaTrashCan className="cursor-pointer hover:text-red-500" />
                        </button>
                        <div className="bg-white/10 backdrop-blur-md rounded-full w-full flex items-center justify-between p-2">
                        <button
                            onClick={() => {
                            handleDecrement({ cart_id: cart.id });
                            }}
                            className="p-1 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <FaMinus />
                        </button>
                        <input
                            type="text"
                            inputMode="number"
                            value={cart.quantity == "" ? "" : Number.parseInt(cart.quantity)}
                            onChange={(e) => {
                                setQuantity(e.target.value);
                                setAllCarts(allCarts.map((value) => {
                                    return {
                                        id: value.id,
                                        product_name: value.product_name,
                                        product_price: value.product_price,
                                        product_stock: value.product_stock,
                                        product_image_url: value.product_image_url,
                                        created_at: value.created_at,
                                        quantity: (value.id == cart.id ? e.target.value : value.quantity)
                                    }
                                }));
                            }}
                            className="bg-transparent text-white text-center w-16 focus:outline-none"
                            min="0"
                            onBlur={() => {
                                handleChangeQuantity({ cart_id: cart.id });
                            }}
                        />
                        <button
                            onClick={() => {
                            handleIncrement({ cart_id: cart.id });
                            }}
                            className="p-1 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <FaPlus />
                        </button>
                        </div>
                        {/* End Add Quantity */}
                    </div>
                </div>
                </div>
            ))}
            </div>
            <div id="payment-details" className="bg-transparent border-white border rounded-lg w-2/5 min-h-[20vh] h-full relative grid grid-rows-[auto_1fr_auto] py-2 gap-4">
                <h1 className="mt-2 w-full text-center text-xl">Ringkasan Belanja</h1>
                <div>
                    {prices.length > 1 ? 
                    (<>
                    {prices.map((price, index) => {
                        return <p className="ml-2">Rp. {number_to_rp(price)} ({productsName[index]})</p>
                    })}
                    <div className="ml-2 flex items-start h-1">
                        <hr className="w-3/5" />
                        <p className="relative -top-3">+</p>
                    </div>
                    <p className="ml-2">Rp. {number_to_rp(prices.reduce((prev, curr) => prev+curr))}</p>
                    </>):<></>
                    }
                    <p className="ml-2 mt-2">{prices.length > 0 ? <>Total: Rp. {prices.length === 1?number_to_rp(prices[0]):number_to_rp(prices.reduce((prev, curr) => prev+curr))}</> : <>-</>}</p>
                </div>
                <div className="w-full flex justify-center items-center">
                    <button className="border border-white px-20 py-2 rounded-lg hover:bg-[#ffffff22]" onClick={handleCheckout}>Beli!</button>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default KeranjangBelanja;
