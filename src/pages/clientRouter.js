import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import LoginPage from "./login/loginPage";
import SignUpPage from "./signUp";
import HomePage from "./home";
import AdminPage from "./admin";
import AllProductPage from "./allProduct/allProductPage";
import ProfileSetting from "./profileSetting";
import KeranjangBelanja from "./kerangjangBelanja";

// Profile Subpages
import Biodata from "./subPages/biodata";
import Notification from "./subPages/notification";
import Payment from "./subPages/payment";
import ProfileSecurity from "./subPages/securityProfile";
import Topup from "./subPages/topup";
import DaftarTransaksi from "./subPages/daftarTransaksi";
import AdminProducts from "./admin/subAdmin/products";
import DashboardAdmin from "./admin/subAdmin/dashboard";
import OrderList from "./admin/subAdmin/orderList";
import CustomersList from "./admin/subAdmin/customers";
import ReportSell from "./admin/subAdmin/report";
import SettingsAdmin from "./admin/subAdmin/settingAdmin";

function ClientRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/allProduct" element={<AllProductPage />} />
                <Route path="/keranjangBelanja" element={<KeranjangBelanja />} />
                <Route path="/signUp" element={<SignUpPage />} />

                {/* Nested Routes untuk Admin */}
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
                    <Route path="daftarTransaksi" element={<DaftarTransaksi />} />
                    <Route path="notifikasi" element={<Notification />} />
                    <Route path="pembayaran" element={<Payment />} />
                    <Route path="security" element={<ProfileSecurity />} />
                    <Route path="topUp" element={<Topup />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default ClientRouter;
