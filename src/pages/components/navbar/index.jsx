import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaCoins,
  FaBell,
  FaChevronDown,
  FaHeart,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaCartShopping } from "react-icons/fa6";
import { getNotificationAPI, logoutAPI } from "../../api/student";
import { getCartAPI } from "../../api/cart";
import CheckLogin from "../loginComponents/checkLogin";
import CheckMustLogin from "../loginComponents/checkMustLogin";

const NavigateBar = ({ is_must_login = false }) => {
  const [itemsCart, setItemsCart] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [elevated, setElevated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({
    username: "Not sign in.",
    imgProfile: "/signup_profile.svg",
    coin: -1
  });
  const navigate = useNavigate();

  //? Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setElevated(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //? Handle menu
  useEffect(() => {
    if (menuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    }
  }, [menuOpen]);

  //? Handle logout
  const handleLogout = async () => {
    const response = await logoutAPI();
    if(!response.success) {
      alert("There's internal server error when trying to logout. Please contact developer.");
      return;
    }
  };

  //? Handle login
  const handleLogin = () => {
    navigate("/");
  }

  //? Update User Data
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if(userData) {
      setUser({
        username: userData.fullname,
        imgProfile: "/avatar.svg",
        coin: userData.balance
      });
    }
  }, []);

  //? Update Items Cart
  useEffect(() => {
    getCartAPI().then(cartData => {
        if(cartData.success) {
            setItemsCart(cartData.result);
        }
        else {
            console.error(`There's an error when trying to get cart data. Error: ${cartData.error}`);
        }
    });
  }, [])

  //? Update Notifcation Data
  useEffect(() => {
    getNotificationAPI().then(notificationResult => {
        if(notificationResult.success) {
            setNotifications(notificationResult.result);
        }
        else {
            console.error(`There's an error when trying to get cart data. Error: ${notificationResult.error}`);
        }
    })
  }, [])

  return (
    <>
      {is_must_login?<CheckMustLogin />:<CheckLogin />}
      <nav
        className={`z-[999] p-4 uppercase tracking-[3px] fixed top-0 left-0 flex flex-row items-center justify-between sm:justify-end w-full transition-all duration-300  ${
          elevated
            ? "bg-zinc-900 shadow-md shadow-white/50 rounded-b-xl"
            : "bg-transparent relative"
        }`}
      >
        <Link to="/home" className="text-white px-4 font-bold sm:hidden">
          MitraStore
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:flex-row items-center gap-4 relative">
          <Link
            to="/home"
            className="text-white px-4 font-bold fixed left-4"
          >
            MitraStore
          </Link>

          <Link
            to="/products"
            className="text-white px-4 font-bold uppercase"
          >
            Products
          </Link>

          {/* Container Icon */}
          <div
            id="containerIcon"
            className=" flex flex-row- justify-center items-center gap-6"
          >
            {/* Cart Dropdown */}
            <Menu as="div" className="dropDown relative flex justify-center">
              <MenuButton className="text-white text-xl flex flex-row items-center ">
                <FaCartShopping />
              </MenuButton>
              <MenuItems className="absolute top-[100%] mt-2 w-[20rem] p-2 text-white rounded-lg bg-zinc-900 shadow-inner shadow-zinc-800">
                {itemsCart.length > 0 ? (
                  itemsCart.map((produkCart) => (
                    <MenuItem key={produkCart.id} as="div">
                      <div className="flex items-center gap-4 p-2 hover:bg-zinc-800 rounded-lg">
                        <img
                          src={produkCart.product_image_url}
                          className="w-12 h-12 object-cover rounded-md"
                          alt={produkCart.product_name}
                        />
                        <div className="flex flex-col gap-1 justify-center w-[12rem]">
                          <p className="text-[14px] font-medium truncate">
                            {produkCart.product_name}
                          </p>
                          <p className="text-[12px] text-white font-semibold truncate font-sans">
                            Rp. {produkCart.product_price}
                          </p>
                          <p className="text-[10px] text-gray-300">
                            Quantity :{" "}
                            <span className="text-white font-semibold">
                              {produkCart.quantity}x
                            </span>
                          </p>
                        </div>
                      </div>
                    </MenuItem>
                  ))
                ) : (
                  <p className="text-center text-sm text-gray-400">
                    Cart is empty
                  </p>
                )}
                <Link
                  to={"/carts"}
                  className="text-white text-xs flex flex-row items-center justify-center p-3 hover:text-gray-300 duration-300"
                >
                  Go To Cart
                </Link>
              </MenuItems>
            </Menu>

            {/* Notification */}
            <Menu as="div" className="dropDown relative flex justify-center">
              <MenuButton className="text-white text-xl flex flex-row items-center">
                <FaBell />
              </MenuButton>
              <MenuItems className="absolute top-[100%] mt-2 w-80 p-4 text-white rounded-lg bg-zinc-900 shadow-inner shadow-zinc-800">
                {notifications ? <>
                    {notifications.slice(0, Math.min(notifications.length, 5)).map(notification_data => {
                        return (<MenuItem key={notification_data.id} as="div">
                                    <button className={`flex flex-col gap-1 justify-center w-full bg-[#555] p-4 opacity-${notification_data.read?"25":"100"}`}>
                                        <p className="text-[14px] font-bold truncate">
                                        {notification_data.title}
                                        </p>
                                        <p className="text-[12px] text-white font-light truncate font-sans">
                                        {notification_data.content}
                                        </p>
                                    </button>
                                </MenuItem>)
                    })}
                </> : <p className="text-center text-sm text-gray-400">
                  No Notifications
                </p>}
                <Link
                  to={"/notification"}
                  className="text-white text-xs flex flex-row items-center justify-center mt-4 hover:text-gray-300 duration-300"
                >
                  See all notifications
                </Link>
              </MenuItems>
            </Menu>
          </div>
          {/* Profile Dropdown */}
          <Menu as="div" className="dropDown relative">
            <MenuButton
              className={`flex flex-row items-center gap-2 text-white font-bold uppercase w-[12rem] p-2 rounded-lg ${
                elevated ? "bg-zinc-800 duration-300" : "bg-transparent"
              }`}
            >
              <img
                src={user.imgProfile}
                className="w-8 h-8 rounded-full"
                alt=""
              />
              <p className="text-xs truncate">{user.username}</p>
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-[20rem] p-2 text-white rounded-xl space-y-2 bg-zinc-900 shadow-inner shadow-zinc-800">
              <MenuItem as="div">
                <Link
                  to="/profileSetting"
                  className="hover:bg-zinc-800 flex items-center gap-4 p-2 rounded-lg"
                >
                  <img
                    src={user.imgProfile}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="text-xs truncate">{user.username}</p>
                    {(() => {
                       return (user.coin>=0)?
                       <div className="flex items-center gap-1 text-yellow-400 text-xs">
                         <FaCoins />
                         <span>{user.coin}</span>
                       </div>:<></> 
                    })()
                    }
                  </div>
                </Link>
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => navigate("/profileSetting/orders")}
                    className={`w-full text-left px-4 py-2 text-xs rounded-md uppercase font-bold transition ${
                      active ? "bg-zinc-800" : "bg-transparent"
                    }`}
                  >
                    Pembelian
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => navigate("/wishlist")}
                    className={`w-full text-left px-4 py-2 text-xs rounded-md uppercase font-bold transition ${
                      active ? "bg-zinc-800" : "bg-transparent"
                    }`}
                  >
                    Wishlist
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => navigate("/profileSetting")}
                    className={`w-full text-left px-4 py-2 text-xs rounded-md uppercase font-bold transition ${
                      active ? "bg-zinc-800" : "bg-transparent"
                    }`}
                  >
                    Setting
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  user.coin>=0?<button
                  onClick={handleLogout}
                  className={`w-full text-left px-4 py-2 text-xs rounded-md uppercase font-bold transition ${
                    active ? "bg-red-600" : "bg-transparent"
                  }`}
                >
                  Logout
                </button>:<button
                    onClick={handleLogin}
                    className={`w-full text-left px-4 py-2 text-xs rounded-md uppercase font-bold transition ${
                      active ? "bg-green-600" : "bg-transparent"
                    }`}
                  >
                    Login
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl"
        >
          <FaBars />
        </button>
      </nav>

      {/* Mobile Menu Overlay - Separated from nav */}
      {menuOpen && (
        <div
          className={`fixed inset-0 w-full h-full bg-black/90 z-[1000] ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="min-h-screen flex flex-col">
            <div className="sticky top-0 bg-black/90 p-4 flex justify-between items-center">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white text-3xl absolute right-4 top-4"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex-1 p-6 space-y-8">
              <Link
                to="/home"
                className="block text-white text-xl uppercase"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/products"
                className="block text-white text-xl uppercase"
                onClick={() => setMenuOpen(false)}
              >
                Products
              </Link>

              {/* Profile Menu */}
              <Menu as="div" className="dropDown relative">
                <MenuButton className="flex flex-row items-center gap-2 text-white uppercase w-[12rem]">
                  <h1 className="text-white text-xl">Profile</h1>
                  <FaChevronDown className="text-xl" />
                </MenuButton>
                <MenuItems className="mt-2 text-white p-2 space-y-2 bg-zinc-800 shadow-inner shadow-zinc-900 rounded-lg">
                  <MenuItem as="div">
                    <Link
                      to="/profileSetting"
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-zinc-800 duration-300"
                    >
                      <img
                        src={user.imgProfile}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex flex-col">
                        <p className="text-xs truncate">{user.username}</p>
                        <div className="flex items-center gap-1 text-yellow-400 text-xs">
                          <FaCoins />
                          <span>{user.coin}</span>
                        </div>
                      </div>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          navigate("/daftarTransaksi");
                        }}
                        className={`w-full text-left px-4 py-3 text-xs rounded-md uppercase transition ${
                          active ? "bg-zinc-700" : "bg-transparent"
                        }`}
                      >
                        Pembelian
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          navigate("/setting");
                        }}
                        className={`w-full text-left px-4 py-3 text-xs rounded-md uppercase transition ${
                          active ? "bg-zinc-700" : "bg-transparent"
                        }`}
                      >
                        Setting
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          handleLogout();
                        }}
                        className={`w-full text-left px-4 py-3 text-xs rounded-md uppercase transition ${
                          active ? "bg-red-600" : "bg-transparent"
                        }`}
                      >
                        Logout
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>

              {/* Icons Container */}
              <div className="flex flex-row gap-10">
                {/* Cart Menu */}
                <Menu as="div" className="dropDown relative">
                  <MenuButton className="text-white text-xl">
                    <FaCartShopping />
                  </MenuButton>
                  <MenuItems className="absolute left-0 mt-6 w-[20rem] p-2 text-white rounded-lg shadow-inner shadow-zinc-900 bg-zinc-800">
                    {itemsCart.length > 0 ? (
                      itemsCart.map((produkCart) => (
                        <MenuItem key={produkCart.id} as="div">
                          <div className="flex items-center gap-4 p-2 hover:bg-zinc-800 rounded-lg">
                            <img
                              src={produkCart.imgUrl}
                              className="w-12 h-12 object-cover rounded-md"
                              alt={produkCart.product_name}
                            />
                            <div className="flex flex-col w-[12rem]">
                              <p className="text-sm font-medium truncate">
                                {produkCart.product_name}
                              </p>
                              <p className="text-md text-white font-semibold truncate">
                                Rp. {produkCart.product_price}
                              </p>
                              <p className="text-xs text-gray-300">
                                Quantity :{" "}
                                <span className="text-white font-semibold">
                                  {produkCart.quantity}x
                                </span>
                              </p>
                            </div>
                          </div>
                        </MenuItem>
                      ))
                    ) : (
                      <p className="text-center text-sm text-gray-400">
                        Cart is empty
                      </p>
                    )}
                    <button className="text-white text-xs w-full mx-auto hover:text-gray-300 duration-300">
                      Go To Cart
                    </button>
                  </MenuItems>
                </Menu>

                {/* Notification Menu */}
                <Menu as="div" className="dropDown relative">
                  <MenuButton className="text-white text-xl">
                    <FaBell />
                  </MenuButton>
                  <MenuItems className="absolute -left-10 mt-6 w-[20rem] p-2 text-white rounded-lg shadow-inner shadow-zinc-900 bg-zinc-800">
                    <p className="text-center text-sm text-gray-400">
                      No Notifications
                    </p>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigateBar;
