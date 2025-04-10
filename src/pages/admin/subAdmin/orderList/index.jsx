import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { confirm_order, get_admin_order_list } from "../../../api/order";
import strftime from "strftime";
import { number_to_rp } from "../../../../javascript/client_function";
import Popup from "reactjs-popup";

const OrderList = () => {
  const [listItems, setListItems] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupPlace, setPickupPlace] = useState("");
  
  // Get the order list data
  useEffect(() => {
    get_admin_order_list().then(response => {
        if(response.success) {
            setListItems(response.result);
        }
        else {
            console.error(`There's an error in server side when trying to get admin order list. Error: ${response.error}`);
        }
    }).catch(error => {
        console.error(`There's an error in client side when trying to get admin order list. Error: ${error}`);
    })
    
  }, []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Calculate total number of pages
  const totalPages = Math.ceil(listItems.length / itemsPerPage);

  // Get the current page's data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = listItems.slice(startIndex, endIndex);

  // Handle "Previous" button click
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle "Next" button click
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle confirm order
  const [processingOrder, setProcessingOrder] = useState(false);
  const handleConfirmOrder = async () => {
    setProcessingOrder(true);
    const result = await confirm_order({ order_id: selectedOrderId, pickup_place: pickupPlace, pickup_time: pickupTime });
    if(result.success) {
        setListItems(listItems.map(orderData => {
            if(orderData.id == selectedOrderId) {
                orderData.status = "Confirmed By The Admin";
                orderData.status_code = 1;
            }
            return orderData
        }))
    }
    else {
        alert("There's an error. Please contact developer");
        console.error(result.error);
    }
    setProcessingOrder(false);
  }

  return (
    <>
      <section className="p-6">
        <h1 className="text-white text-2xl text-center font-semibold mb-4">
          Order List
        </h1>
        <div className="overflow-x-scroll">
          <table className="min-w-full text-white text-center table-fixed border-collapse">
            {/* Header Table */}
            <tr className="min-w-full border-b border-zinc-700 *:px-4 *:py-2 *:bg-zinc-700 *:min-w-max">
              <th>No.</th>
              <th>Nama</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Harga</th>
              <th>Total</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {/* Body Table */}
            {currentItems.map((orderData, index) => (
              <tr
                key={orderData.id}
                className="min-w-full border-b border-zinc-700 hover:bg-zinc-700 hover:cursor-pointer *:px-4 *:py-3 *:min-w-max"
                onClick={() => { window.location.href=`/admin/orderList/detail?id=${orderData.id}` }}
              >
                <td>{index + 1}</td>
                <td>{orderData.student_name}</td>
                <td>{orderData.products_data[0].product_name} <span className="text-sm opacity-50">{orderData.products_data.length > 1 ? `and ${orderData.products_data.length - 1} more...` : ""}</span></td>
                <td>{number_to_rp(orderData.products_data[0].order_quantity)}</td>
                <td>{number_to_rp(orderData.products_data[0].product_price, true)}</td>
                <td>{orderData.total_price}</td>
                <td>{strftime("%d/%m/%Y", new Date(orderData.created_at))}</td>
                <td>{strftime("%H:%M:%S", new Date(orderData.created_at))}</td>
                <td>{orderData.status}</td>
                <td>
                  <div className="w-full h-full flex content-center items-center gap-2">
                    <Popup
                        trigger={
                            <button className="bg-green-400 p-2 rounded-lg disabled:bg-green-800 pointer-events-all" disabled={processingOrder||(orderData.status_code != 0)}>
                                <FaCheck />
                            </button>
                        }
                        onOpen={() => {
                            setSelectedOrderId(orderData.id);
                        }}
                        modal
                        >
                            {
                                close => (
                                    <>
                                        <div className="bg-black border-white border-2 p-10 h-[50vh] grid grid-rows-[auto_auto_auto_1fr_auto] gap-4 [&_.data-field]:grid [&_.data-field]:grid-cols-2 [&_.data-field]:items-center">
                                            <h1 className="text-3xl">Konfirmasi Order</h1>
                                            <div className="data-field mt-4">
                                                <label htmlFor="place">Tempat Pengambilan: </label>
                                                <input className="p-2 bg-transparent border-white border-2" type="text" name="place" id="place" placeholder="Di ruang guru.." onChange={(e) => setPickupPlace(e.target.value)} />
                                            </div>
                                            <div className="data-field">
                                                <label htmlFor="time">Waktu Pengambilan: </label>
                                                <input className="p-2 bg-transparent border-white border-2" type="text" name="time" id="time" placeholder="Setelah Apel Sore" onChange={(e) => setPickupTime(e.target.value)} />
                                            </div>
                                            <div></div>
                                            <div className="border-none p-0 flex flex-row gap-4 *:py-2 *:border-white *:border-2 *:bg-transparent *:w-full *:h-full">
                                                <button onClick={close}>Back</button>
                                                <button onClick={() => {handleConfirmOrder(); close();}}>Submit</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                    </Popup>
                    <button className="bg-red-400 p-2 rounded-lg disabled:bg-red-800" disabled={processingOrder}>
                        <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </table>

          {/* Pagination Controls */}
          <div id="containerPagination" className="sm:relative fixed bottom-0 left-0 right-0">
            <div id="paginationTable" className="flex justify-center mt-4">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-zinc-900 text-white rounded-l-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-zinc-900 text-white">
                Page {currentPage} of {totalPages||1}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages||1}
                className="px-4 py-2 bg-zinc-900 text-white rounded-r-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderList;
