import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import LoginPage from "./login/loginPage";
import SignUpPage from "./signUp";
import HomePage from "./home";
import AdminPage from "./admin";
import AllProductPage from "./allProduct/allProductPage";
import ProfileSetting from "./profileSetting";
import KeranjangBelanja from "./kerangjangBelanja";
import CheckoutPage from "./checkout/checkoutPage";

// Profile Subpages
import Biodata from "./subPages/biodata";
import Notification from "./subPages/notification";
import Payment from "./subPages/payment";
import ProfileSecurity from "./subPages/securityProfile";
import Topup from "./subPages/topup";
import StudentOrderList from "./subPages/orders";
import AdminProducts from "./admin/subAdmin/products";
import DashboardAdmin from "./admin/subAdmin/dashboard";
import OrderList from "./admin/subAdmin/orderList";
import CustomersList from "./admin/subAdmin/customers";
import ReportSell from "./admin/subAdmin/report";
import SettingsAdmin from "./admin/subAdmin/settingAdmin";
import WishlistPage from "./wishlist";
import ProductDetail from "./productDetail";
import NotificationPage from "./components/notification";
import DetailNotificationPage from "./components/notification/detailNotification";
import OrderDetail from "./orderDetail";
import StudentOrderDetail from "./studentOrderDetail";

function ClientRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/products" element={<AllProductPage />} />
                <Route path="/carts" element={<KeranjangBelanja />} />
                <Route path="/signUp" element={<SignUpPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/products/detail" element={<ProductDetail />} />
                <Route path="/notification" element={<NotificationPage />} />
                <Route path="/notification/detail" element={<DetailNotificationPage />} />
                <Route path="/order/detail" element={<StudentOrderDetail />} />

                {/* Nested Routes untuk Admin */}
                <Route path="/admin/orderList/detail" element={<OrderDetail />} />
                <Route path="/admin" element={<AdminPage />}>
                    <Route index element={<DashboardAdmin />} />
                    <Route path="dashboardAdmin" element={<DashboardAdmin />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orderList" element={<OrderList />} />
                    <Route path="customers" element={<CustomersList />} />
                    <Route path="report" element={<ReportSell />} />
                    <Route path="settingAdmin" element={<SettingsAdmin />} />
                </Route>
                {/* Nested Routes untuk ProfileSetting */}
                <Route path="/profileSetting" element={<ProfileSetting />}>
                    <Route index element={<Biodata />} />
                    <Route path="bioData" element={<Biodata />} />
                    <Route path="orders" element={<StudentOrderList />} />
                    <Route path="notifications" element={<Notification />} />
                    <Route path="payment" element={<Payment />} />
                    <Route path="security" element={<ProfileSecurity />} />
                    <Route path="topUp" element={<Topup />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default ClientRouter;
