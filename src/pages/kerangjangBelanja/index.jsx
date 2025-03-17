import { FaTrashCan, FaMinus, FaPlus } from "react-icons/fa6";
import NavigateBar from "../components/navbar";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { changeQuantityCartAPI, deleteCartAPI, getCartAPI } from "../api/cart";

const KeranjangBelanja = () => {
  const [allCarts, setAllCarts] = useState([]);
  const [quantity, setQuantity] = useState(0);

  // Fungsi untuk menambah jumlah
  const handleIncrement = async ({ cart_id }) => {
    const result = await changeQuantityCartAPI({ cart_id: cart_id, quantity_changes: 1 });
    if(result.success) {
      window.location.reload();
    }
    else {
      console.error(result.error);
    }
  };

  // Fungsi untuk mengurangi jumlah
  const handleDecrement = async ({ cart_id }) => {
    const result = await changeQuantityCartAPI({ cart_id: cart_id, quantity_changes: -1 });
    if(result.success) {
      window.location.reload();
    }
    else {
      console.error(result.error);
    }
  };

  // Fungsi untuk mengubah jumlah
  const handleChangeQuantity = async ({ cart_id }) => {
    const result = await changeQuantityCartAPI({ cart_id: cart_id, quantity_changes: quantity, is_set: true });
    if(result.success) {
      window.location.reload();
    }
    else {
      console.error(result.error);
    }
  }

  const handleDelete = async ({ cart_id }) => {
    const result = await deleteCartAPI({ cart_id: cart_id });
    if(result.success) {
      window.location.reload();
    }
    else {
      console.error(result.error);
    }
  }

  // Update allCarts data
  useEffect(() => {
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
  }, []);

  return (
    <>
      <SessionProvider><NavigateBar /></SessionProvider>
      <div className="max-w-7xl mx-auto">
        <div id="title" className="text-white ">
          <h1>Keranjang Belanja</h1>
        </div>
        <div
          id="containerKeranjang"
          className="flex flex-col gap-4 items-center"
        >
          {allCarts.map((cart) => (
            <div
              key={cart.id}
              id="cardListProduct"
              className="flex flex-col items-end border border-white rounded-lg w-full px-6 py-2 relative"
            >
              {/* Items */}
              <div className="flex flex-row gap-4 items-start w-full">
                <img src={cart.product_image_url} className="w-20 h-full mx-auto" alt="" />
                {/* Title and Price */}
                <div className="flex flex-row items-center justify-between w-full gap-4">
                  <h1 className="text-xl text-white">{cart.product_name}</h1>
                  <p className="text-sm text-gray-300">{cart.product_price}</p>
                </div>
                {/* End Title and Price */}
              </div>
              {/* End Items */}
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
                    defaultValue={Number.parseInt(cart.quantity)}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="bg-transparent text-white text-center w-16 focus:outline-none"
                    min="0"
                    onBlur={handleChangeQuantity}
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
          ))}
        </div>
      </div>
    </>
  );
};

export default KeranjangBelanja;
