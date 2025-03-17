export class Student {
    static UpdateEndpoint: string = "http://localhost:5500/api/student/update";
    static AddToCartEndpoint: string = "http://localhost:5500/api/student/add_to_cart";
    static GetCartEndpoint: string = "http://localhost:5500/api/student/get_cart";
    static ChangeCartQuantityEndpoint: string = "http://localhost:5500/api/student/change_cart_quantity";
    static OrderProductEndpoint: string = "http://localhost:5500/api/student/order_product"
}

export class Admin {
    static GetOrderList: string = "http://localhost:5500/api/admin/get_order";
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