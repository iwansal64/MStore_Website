export class Student {
    static UpdateEndpoint: string = "http://localhost:5500/api/student/update";
    static AddToCartEndpoint: string = "http://localhost:5500/api/student/add_to_cart";
    static GetCartEndpoint: string = "http://localhost:5500/api/student/get_cart";
    static ChangeCartQuantityEndpoint: string = "http://localhost:5500/api/student/change_cart_quantity";
    static OrderProductEndpoint: string = "http://localhost:5500/api/student/order_product";
    static GetOrderHistoryEndpoint: string = "http://localhost:5500/api/student/get_orders_history";
    static ConfirmOrder: string = "http://localhost:5500/api/student/confirm_order_student";
    static CancelOrder: string = "http://localhost:5500/api/student/cancel_order_student";
    static ToggleProductFavorite: string = "http://localhost:5500/api/student/toggle_favorite";
    static GetFavoriteProducts: string = "http://localhost:5500/api/student/get_favorite";
    static GetNotification: string = "http://localhost:5500/api/student/get_notification";
    static GetNotificationById: string = "http://localhost:5500/api/student/get_notification_by_id";
}

export class Admin {
    static GetOrderList: string = "http://localhost:5500/api/admin/get_order";
    static GetAdminStats: string = "http://localhost:5500/api/admin/get_stats";
    static ConfirmOrder: string = "http://localhost:5500/api/admin/confirm_order";
    static SendNotification: string = "http://localhost:5500/api/admin/send_notification";
    static GetAdminProducts: string = "http://localhost:5500/api/admin/get_admin_products";
    static GetOrderGroupById: string = "http://localhost:5500/api/admin/get_order_group_by_id";
}

export class Account {
    static GetEndpoint: string = "http://localhost:5500/api/account/get";
    static LogoutEndpoint: string = "http://localhost:5500/api/account/logout";
    static LoginEndpoint: string = "http://localhost:5500/api/account/login";
    static RegisterEndpoint: string = "http://localhost:5500/api/account/register";
    static ValidateEndpoint: string = "http://localhost:5500/api/account/validate";
    static VerifyRegisterEndpoint: string = "http://localhost:5500/api/account/verify_register";
}

export class Product {
    static GetAllProductEndpoint: string = "http://localhost:5500/api/product/get_all";
    static AddProductEndpoint: string = "http://localhost:5500/api/product/add";
    static UpdateProductEndpoint: string = "http://localhost:5500/api/product/update";
    static DeleteProduct: string = "http://localhost:5500/api/product/delete";
    static GetProductById: string = "http://localhost:5500/api/product/get_by_id";
}