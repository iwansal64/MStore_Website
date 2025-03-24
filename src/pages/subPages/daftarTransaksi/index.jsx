import { useEffect, useState } from "react";
import { cancel_student_order, confirm_student_order, get_student_order_history } from "../../api/order";
import { number_to_rp } from "../../../javascript/client_function";
import Loader from "../../components/loader";

const DaftarTransaksi = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
    
  //? Get order history
  useEffect(() => {
    get_student_order_history().then(response => {
      if(response.success) {
        setOrderHistory(response.result);
      }
      else {
        console.error(response);
      }
      setIsLoaded(true);
    }).catch(error => {
      console.error(error);
    })
  }, [])

  async function handleCancel({ order_id }) {
    const result = await cancel_student_order({ order_id: order_id });
    if(result.success) {
        alert("Successfully cancel order!");
        window.location.reload();
    }
    else {
        alert("There's something unexpected happened. Please contact developer");
        console.error(`Error: ${result.error}`);
    }
  }

  async function handleConfirm({ order_id }) {
    const result = await confirm_student_order({ order_id: order_id });
    if(result.success) {
        alert("Successfully cancel order!");
        window.location.reload();
    }
    else {
        alert("There's something unexpected happened. Please contact developer");
        console.error(`Error: ${result.error}`);
    }
  }

  return (
    <section>
      <div className="container text-white text-2xl">
        <h1 className="mt-4">Daftar Transaksi</h1>
        <div id="transaction-list" className="mt-2 border border-white border-1 w-full h-full flex flex-col gap-2 p-4 overflow-y-auto overflow-x-hidden">
            {isLoaded ? <>{orderHistory.length > 0 ? orderHistory.map((value) => {
              return <div className="border border-red w-full h-full p-4 grid grid-flow-col grid-cols-[auto_1fr_0.5fr] gap-4">
                <img src={value.products_data[0].product_image_url} alt="Product Image" />
                <div className="information grid grid-rows-[auto_auto_1fr] h-full items-end">
                    <p className="mb-0 text-xl font-bold">{value.products_data[0].product_name}{value.products_data.length > 1 ? <span className="text-sm font-thin"> and {value.products_data.length-1} more..</span> : ""}</p>
                    <p className="mt-0 text-lg font-thin">{number_to_rp(value.total_price.toString(), true)}</p>
                    <p className={(value.status_code == 1?"bg-green-800":(value.status_code > 1 ? "bg-grey-800" : "bg-red-800"))+" mt-0 text-sm font-thin p-2 w-fit h-fit rounded-full"}>{value.status}</p>
                </div>
                <div className="actions justify-self-end w-full flex flex-col justify-around">
                    <button disabled={value.status_code != 1} className="border p-2 hover:border-red-100 text-lg w-full flex justify-center items-center disabled:opacity-[0.2]" onClick={() => { handleConfirm({ order_id: value.id }) }}>Confirm</button>
                    <button disabled={value.status_code != 0} className="border p-2 hover:border-red-100 text-lg w-full flex justify-center items-center disabled:opacity-[0.2]" onClick={() => { handleCancel({ order_id: value.id }) }}>Cancel</button>
                </div>
              </div>
            }) : <p className="text-xl opacity-50">Kamu belum melakukan transaksi apapun.</p>}</> : <Loader />}
        </div>
      </div>
    </section>
  );
};

export default DaftarTransaksi;
