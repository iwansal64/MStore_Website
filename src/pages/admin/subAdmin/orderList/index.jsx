import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { confirm_order, get_admin_order_list } from "../../../api/order";
import strftime from "strftime";
import { number_to_rp } from "../../../../javascript/client_function";

const OrderList = () => {
  const [listItems, setListItems] = useState([]);
  
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
  const handleConfirmOrder = async (order_id) => {
    setProcessingOrder(true);
    const result = await confirm_order({ order_id: order_id });
    if(result.success) {
        alert("Successfully confirm the order");
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
          <table className="w-full text-white text-center">
            {/* Header Table */}
            <tr className="border-b border-zinc-700">
              <th className="px-4 py-2 bg-zinc-700">No.</th>
              <th className="px-4 py-2 bg-zinc-700">Nama</th>
              <th className="px-4 py-2 bg-zinc-700">Product</th>
              <th className="px-4 py-2 bg-zinc-700">Quantity</th>
              <th className="px-4 py-2 bg-zinc-700">Harga</th>
              <th className="px-4 py-2 bg-zinc-700">Total</th>
              <th className="px-4 py-2 bg-zinc-700">Date</th>
              <th className="px-4 py-2 bg-zinc-700">Time</th>
              <th className="px-4 py-2 bg-zinc-700">Status</th>
              <th className="px-4 py-2 bg-zinc-700">Action</th>
            </tr>
            {/* Body Table */}
            {currentItems.map((orderData, index) => (
              <tr
                key={orderData.id}
                className="border-b border-zinc-700 hover:bg-zinc-700"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{orderData.student_name}</td>
                <td className="px-4 py-3">{orderData.products_data[0].product_name}</td>
                <td className="px-4 py-3">{number_to_rp(orderData.order_quantity, true)}</td>
                <td className="px-4 py-3">{number_to_rp(orderData.product_price, true)}</td>
                <td className="px-4 py-3">{orderData.total_price}</td>
                <td className="px-4 py-3">{strftime("%d/%m/%Y", new Date(orderData.created_at))}</td>
                <td className="px-4 py-3">{strftime("%H:%M:%S", new Date(orderData.created_at))}</td>
                <td className="px-4 py-3">{orderData.status}</td>
                <td className="flex flex-row justify-center items-center gap-2 p-2 ">
                  <button className="bg-green-400 p-2 rounded-lg disabled:bg-green-800" disabled={processingOrder||(orderData.status_code != 0)} onClick={() => { handleConfirmOrder(orderData.id); }}>
                    <FaCheck />
                  </button>
                  <button className="bg-red-400 p-2 rounded-lg disabled:bg-red-800" disabled={processingOrder}>
                    <FaTimes />
                  </button>
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
