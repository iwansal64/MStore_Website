import NavigateBar from "../components/navbar";
import { dummy_categories } from "../variables/kategori";
// import { allProduct } from "../variables/products";
import { FaSearch, FaChevronDown, FaCheck } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import { getAllProductsAPI, getCategoriesAPI, getProductByCategoryAPI } from "../api/product";
import { addToCartAPI } from "../api/cart";
import { dummy_products } from "../variables/allProduct";
import { get_development_mode, number_to_rp } from "../../javascript/client_function";
import Loader from "../components/loader";
import { useSearchParams } from "next/navigation";

const AllProductPage = () => {
  const searchParams = useSearchParams();
  const param_category = searchParams.get("category");
  
  const [allProduct, setAllProduct] = useState([]);
  const [successToAddId, setSuccessToAddId] = useState("");
  const [reloadNavbar, setReloadNavbar] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(param_category ? param_category : "");
  
  const [isLoaded, setIsLoaded] = useState(false);

  const is_development_mode = get_development_mode();
  
  //? Get All Product Through API
  function get_all_product() {
    if(is_development_mode) {
        setAllProduct(dummy_products);
        setTimeout(() => {
            setIsLoaded(true);
        }, Math.random() * 1000 + 500);
    }
    else {
      getAllProductsAPI().then(result => {
          if(result.success) {
              setAllProduct(result.result);
          }
          setIsLoaded(true);
      }).catch(error => {
          console.error(error);
          alert("Sorry but, There's an error when trying to get product!");
          window.location.href = "/home";
      });
    }
  }

  function get_product_by_category(category_name) {
    if(is_development_mode) {
      setAllProduct(dummy_products.filter((value) => value.category == category_name));
      setTimeout(() => {
          setIsLoaded(true);
      }, Math.random() * 1000 + 500);
    }
    else {
      getProductByCategoryAPI({ category: category_name }).then(result => {
        if(result.success) {
          setAllProduct(result.result);
          setIsLoaded(true);
        }
        else {
          console.error("There's an error when trying to get product by category");
          console.error(`Response: ${result}`);
        }
      }).catch(() => {
        alert("Sorry but, There's an error when trying to get product!");
        window.location.href = "/home";
      })
    }
  }
  
  useEffect(() => {
    if(param_category) {
      get_product_by_category(param_category)
    }
    else {
      get_all_product();
    }
  }, []);

  useEffect(() => {
    if(is_development_mode) {
      setCategories(dummy_categories);
    }
    else {
      getCategoriesAPI().then(result => {
        if(result.success) {
          setCategories(result.result);
        }
      }).catch(error => {
        console.error("Sorry but, There's an error when trying to get categories data")
        console.error(error);
      });
    }
  }, []);

  //? Functions Handler
  async function order_product({ product_id }) {
    localStorage.setItem("checkout_product_id", product_id);
    localStorage.removeItem("checkout_carts_id");
    window.location.href = `/checkout`;
  }
  
  async function add_to_cart({ product_id }) {
    if(isProcessing) return alert("Please wait a moment.");
    setIsProcessing(true);
    const result = await addToCartAPI({ product_id: product_id });
    if(result.success) {
        setSuccessToAddId(product_id);
        setReloadNavbar(!reloadNavbar);
        setTimeout(() => {
            setIsProcessing(false);
            setSuccessToAddId("");
        }, 1000);
    }
    else {
        console.error(result);
        alert("There's something wrong when trying to add to cart!");
        setIsProcessing(false);
    }
  }

  function handle_search_input(e) {
    setKeyword(e.target.value);
  }

  function handle_category_change(category_name) {
    setAllProduct([]);
    setIsLoaded(false);

    if(selectedCategory != category_name) {
        setSelectedCategory(category_name);
        get_product_by_category(category_name)
    }
    else {
        setSelectedCategory("");
        get_all_product();
    }
  }

  return (
    <>
      <NavigateBar key={reloadNavbar?"navbar1":"navbar2"} />
      <div className="container translate-y-[2rem] mx-auto px-6">
        <div
          id="searchbar"
          className="pb-6 px-2 relative flex flex-row items-center"
        >
          <div className="relative w-full flex items-center justify-between gap-6">
            <div id="searchBar">
              <FaSearch className="text-white absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
              <input
                type="text"
                placeholder="Cari Produk..."
                className="py-2 pl-10 pr-4 w-full rounded-xl bg-zinc-900 shadow-inner shadow-white/10 text-white outline-none"
                onChange={handle_search_input}
              />
            </div>
            <div id="filter">
              <Menu as="div" className="relative">
                <MenuButton className={`flex items-center gap-2 text-white font-bold uppercase ${selectedCategory != "" ? "bg-zinc-700" : "bg-zinc-900"} shadow-inner shadow-white/10 px-4 py-3 rounded-xl`}>
                  {selectedCategory != "" ? selectedCategory : "Kategori"} <FaChevronDown />
                </MenuButton>
                <MenuItems
                  as="div"
                  className="absolute right-0 mt-2 w-52 border border-white/5 bg-black p-1 text-white rounded-xl shadow-lg z-50"
                >
                  {categories.map((itemsCategory) => (
                    <MenuItem key={itemsCategory.name}>
                      {() => (
                        <button
                          className={`w-full text-left px-4 py-2 rounded-md transition ${
                            (selectedCategory == itemsCategory.name) ? "bg-gray-600" : "bg-black hover:bg-gray-700"
                          }`}
                          onClick={() => { handle_category_change(itemsCategory.name) }}
                        >
                          {itemsCategory.name}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <div
          id="containerItems"
          className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {isLoaded ? 
        // If is loaded
          (allProduct.length == 0 ? 
        // If there's no product found
            <h1 className="text-xl">There's no product found.</h1> 
            : 
        // else
          (allProduct.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase())).map((product) => (
            <div
              key={product.id}
              className="p-4 flex flex-col justify-between shadow-inner shadow-white/10 bg-zinc-900 rounded-xl duration-200 hover:scale-[1.05]"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-1/2 object-contain rounded-md m-auto hover:cursor-pointer"
                onClick={() => { window.location.href = "/products/detail?product_id="+product.id; }}
              />
              <div id="action" className="space-y-4 py-2 px-2">
                <div id="title">
                  <h1 className="text-lg text-white font-bold">
                    {product.name}
                  </h1>
                  <p className="text-md text-gray-200">
                    Price: {number_to_rp(product.price, true)}
                  </p>
                </div>

                <div id="btn" className="flex flex-row gap-2 text-sm">
                  <button 
                    className="w-full px-1 py-2 rounded-xl text-white shadow-inner shadow-white/20 bg-zinc-900 hover:bg-zinc-800 hover:shadow-inner hover:shadow-zinc-900 duration-300" 
                    onClick={()=>{order_product({ product_id: product.id });}}
                  >
                    Buy
                  </button>
                  <button 
                    className="flex justify-center items-center w-full px-1 py-2 rounded-xl text-white shadow-inner shadow-white/20 bg-zinc-900 hover:bg-zinc-800 hover:shadow-inner hover:shadow-zinc-900 duration-300"
                    onClick={()=>{add_to_cart({ product_id: product.id });}}
                  >
                    {successToAddId==product.id?<FaCheck className="flex justify-center items-center" />:"Add To Cart"}
                  </button>
                </div>
              </div>
            </div>
          )))) 
          : 
        // else
          <Loader />}
        </div>
      </div>
    </>
  );
};

export default AllProductPage;
