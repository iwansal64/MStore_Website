import { category } from "../../../variables/kategori";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { addProductAPI, deleteProductAPI, getAllProductsAPI, editProductAPI } from "../../../api/product";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";

const AdminProducts = () => {
  const [allProduct, setAllProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(-1);
  const [productStock, setProductStock] = useState(-1);

  useEffect(() => {
    getAllProductsAPI().then(result => {
      if(result.success) {
        setAllProducts(result.result);
      }
      else {
        console.error(result);
        alert("There's an error retrieving all products. Please contact developer.");
      }
    }).catch(error => {
      console.error(error);
      alert("There's an error retrieving all products. Please contact developer.");
    });
  }, [])

  async function addProduct() {
    const result = await addProductAPI({ name: productName, price: productPrice, stock: productStock });
    if(result.success) {
      alert("Successfully add the product!");
      window.location.reload();
    }
    else {
      console.error(result);
      alert("There's an error when trying to add the product. Please contact developer!");
    }
  }

  async function editProduct() {
    const result = await editProductAPI({ product_id: productId,  name: productName, price: productPrice, stock: productStock });
    if(result.success) {
      alert("Successfully edit the product!");
      window.location.reload();
    }
    else {
      console.error(result);
      alert("There's an error when trying to edit the product. Please contact developer!");
    }
  }
    
  return (
    <>
      <section id="Action">
        <div
          id="searchbar"
          className="pb-6 px-2 relative flex flex-row items-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-fit items-center">
            <div
              id="searchBar"
              className="relative w-full flex flex-row items-center justify-between gap-6"
            >
              <FaSearch className="text-white absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
              <input
                type="text"
                placeholder="Cari Produk..."
                className="py-2 pl-10 pr-4 w-full rounded-xl bg-zinc-900 shadow-inner shadow-white/10 text-white outline-none"
              />
            </div>
            <div id="filter" className="flex flex-row gap-4 w-full">
              <Menu as="div" className="relative">
                <MenuButton className="flex items-center gap-2 text-white font-bold uppercase bg-zinc-900 shadow-inner shadow-white/10 px-4 py-2 rounded-xl">
                  Kategori <FaChevronDown />
                </MenuButton>
                <MenuItems
                  as="div"
                  className="absolute right-0 mt-2 w-52 border border-white/5 bg-black p-1 text-white rounded-xl shadow-lg z-50"
                >
                  {category.map((itemsCategory) => (
                    <MenuItem key={itemsCategory.name}>
                      {({ active }) => (
                        <button
                          className={`w-full text-left px-4 py-2 rounded-md transition ${
                            active ? "bg-gray-700" : "bg-black"
                          }`}
                        >
                          {itemsCategory.name}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
              <Popup trigger={
                <button className="w-full whitespace-nowrap text-white font-bold uppercase bg-zinc-900 shadow-inner shadow-white/10 px-4 py-2 rounded-xl tracking-wider">
                  Add Product
                </button>
              } position={"right center"} modal nested closeOnDocumentClick={false}>
                {
                  close => (
                    <div className="bg-neutral-900/100 p-14 flex flex-col">
                      <div className="grid gap-2">
                        <div className="grid grid-cols-2 place-items-center">
                          <label htmlFor="product-name">Product Name :</label>
                          <input className="bg-transparent border border-1 border-white p-2" type="text" defaultValue={""} name="product-name" id="product-name" onChange={(event) => {setProductName(event.target.value)}} />
                        </div>
                        <div className="grid grid-cols-2 place-items-center">
                          <label htmlFor="product-price">Product Price :</label>
                          <input className="bg-transparent border border-1 border-white p-2" type="number" defaultValue={0} name="product-price" id="product-price" onChange={(event) => {setProductPrice(Number.parseInt(event.target.value))}}/>
                        </div>
                        <div className="grid grid-cols-2 place-items-center">
                          <label htmlFor="product-stock">Product Stock :</label>
                          <input className="bg-transparent border border-1 border-white p-2" type="number" defaultValue={1} name="product-stock" id="product-stock" onChange={(event) => {setProductStock(Number.parseInt(event.target.value))}}/>
                        </div>
                      </div>
                      <button className="mt-8 text-sm py-2 text-white w-full mx-auto border rounded-md hover:bg-white hover:text-black uppercase tracking-wide disabled:opacity-25 disabled:pointer-events-none" 
                        disabled={!((productName != "") && (productPrice > 0))}
                        onClick={async () => {
                          await addProduct();
                          close();
                        }}
                      >Add Product</button>
                      <button className="mt-2 text-sm py-2 text-white w-full mx-auto border rounded-md hover:bg-white hover:text-black uppercase tracking-wide disabled:opacity-25 disabled:pointer-events-none" 
                        onClick={async () => {
                          close();
                        }}
                      >Back</button>
                    </div>
                  )
                }
              </Popup>
            </div>
          </div>
        </div>
      </section>
      <section id="ProductList">
        <div
          id="containerItems"
          className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {allProduct.map((product) => (
            <div
              key={product.id}
              className="p-4 flex flex-col justify-between shadow-inner shadow-white/10 bg-zinc-900 rounded-xl"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-1/2 object-contain rounded-md m-auto"
              />
              <div id="action" className="space-y-4 py-2 px-2">
                <div id="title">
                  <h1 className="text-lg text-white font-bold">
                    {product.name}
                  </h1>
                  <p className="text-md text-gray-200">
                    Price: Rp {product.price}
                  </p>
                  <p className="text-md text-gray-200">
                    Stock: {product.stock}
                  </p>
                </div>

                <div id="btn" className="flex flex-row gap-2 text-sm">
                  <button 
                    className="w-full px-1 py-2 rounded-xl text-white shadow-inner shadow-white/20 bg-zinc-900 hover:bg-zinc-800 hover:shadow-inner hover:shadow-zinc-900 duration-300"
                    onClick={() => {
                      deleteProductAPI({ product_id: product.id }).then(result => {
                        if(!result.success) {
                          console.error(`An error just occured when trying to delete product. Error: ${result.error}`);
                          return;
                        }
                        
                        alert("Product successfully deleted!");
                        window.location.reload();
                      });
                    }}
                  >
                    Delete
                  </button>
                  <Popup trigger={<button className="w-full px-1 py-2 rounded-xl text-white shadow-inner shadow-white/20 bg-zinc-900 hover:bg-zinc-800 hover:shadow-inner hover:shadow-zinc-900 duration-300">
                    Edit
                  </button>} onOpen={() => {
                    setProductId(product.id);
                    console.log(product.id);
                  }} position={"right center"} modal nested closeOnDocumentClick={false}>
                    {
                      close => (
                      <div className="bg-neutral-900/100 p-14 flex flex-col">
                        <div className="grid gap-2">
                        <div className="grid grid-cols-2 place-items-center">
                            <label htmlFor="product-name">Product Name :</label>
                            <input className="bg-transparent border border-1 border-white p-2" type="text" defaultValue={product.name} name="product-name" id="product-name" onChange={(event) => {setProductName(event.target.value)}} />
                        </div>
                        <div className="grid grid-cols-2 place-items-center">
                            <label htmlFor="product-price">Product Price :</label>
                            <input className="bg-transparent border border-1 border-white p-2" type="number" defaultValue={product.price} name="product-price" id="product-price" onChange={(event) => {setProductPrice(Number.parseInt(event.target.value))}}/>
                        </div>
                        <div className="grid grid-cols-2 place-items-center">
                            <label htmlFor="product-stock">Product Stock :</label>
                            <input className="bg-transparent border border-1 border-white p-2" type="number" defaultValue={product.stock} name="product-stock" id="product-stock" onChange={(event) => {setProductStock(Number.parseInt(event.target.value))}}/>
                        </div>
                        </div>
                        <button className="mt-8 text-sm py-2 text-white w-full mx-auto border rounded-md hover:bg-white hover:text-black uppercase tracking-wide disabled:opacity-25 disabled:pointer-events-none" 
                        disabled={((productName == product.name || !productName) && (productPrice == product.price || !productPrice) && (productStock == product.stock || !productStock))}
                        onClick={async () => {
                          await editProduct();
                          close();
                        }}
                        >Update Product</button>
                        <button className="mt-2 text-sm py-2 text-white w-full mx-auto border rounded-md hover:bg-white hover:text-black uppercase tracking-wide disabled:opacity-25 disabled:pointer-events-none" 
                        onClick={async () => {
                          close();
                        }}
                        >Back</button>
                      </div>
                      )
                    }
                  </Popup>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AdminProducts;
