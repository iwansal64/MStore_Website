export class Student {
    static RegisterEndpoint: string = "http://localhost:5500/api/student/register";
    static VerifyRegisterEndpoint: string = "http://localhost:5500/api/student/verify_register";
    static ValidateEndpoint: string = "http://localhost:5500/api/student/validate";
    static GetEndpoint: string = "http://localhost:5500/api/student/get";
    static UpdateEndpoint: string = "http://localhost:5500/api/student/update";
}

export class General {
    static LogoutEndpoint: string = "http://localhost:5500/api/logout";
    static LoginEndpoint: string = "http://localhost:5500/api/login";
}

export class Product {
    static GetAllProductEndpoint: string = "http://localhost:5500/api/product/get_all";
    static AddProductEndpoint: string = "http://localhost:5500/api/product/add";
}