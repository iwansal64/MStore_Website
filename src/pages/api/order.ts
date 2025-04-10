import { Admin, Student } from "./base";

const authorization_string = "90ySD1y9fH299gH90ChOZgvdasoi";

export async function get_admin_order_list() {
    //? Get the order list data
    const response = await (await fetch(Admin.GetOrderList, {
        method: "POST",
        credentials: "include",
        headers: {
            "Authorization": authorization_string
        }
    })).json();

    //? Check the result
    if(response.result) {
        return {
            success: true,
            result: response.result,
        };
    }
    else {
        return {
            success: false,
            error: response.error || response.error_code
        };
    }
}

export async function confirm_order({ order_id, pickup_place, pickup_time }: { order_id: string, pickup_place: string, pickup_time: string }) {
    //? Get the order list data
    const response = await (await fetch(Admin.ConfirmOrder, {
        method: "POST",
        credentials: "include",
        headers: {
            "Authorization": authorization_string,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            order_id: order_id,
            pickup_place: pickup_place,
            pickup_time: pickup_time
        })
    })).json();

    //? Check the result
    if(response.result) {
        return {
            success: true,
            result: response.result,
        };
    }
    else {
        return {
            success: false,
            error: response.error || response.error_code
        };
    }
}

export async function get_student_order_history() { 
    //? Get the order list data
    const response = await (await fetch(Student.GetOrderHistoryEndpoint, {
        method: "POST",
        credentials: "include",
        headers: {
            "Authorization": authorization_string,
        }
    })).json();

    //? Check the result
    if(response.result) {
        return {
            success: true,
            result: response.result,
        };
    }
    else {
        return {
            success: false,
            error: response.error || response.error_code
        };
    }
}

export async function confirm_student_order({ order_id }: { order_id: string }) {
    //? Get the order list data
    const response = await (await fetch(Student.ConfirmOrder, {
        method: "POST",
        credentials: "include",
        headers: {
            "Authorization": authorization_string,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            order_id: order_id
        })
    })).json();

    //? Check the result
    if(response.result) {
        return {
            success: true,
            result: response.result,
        };
    }
    else {
        return {
            success: false,
            error: response.error || response.error_code
        };
    }
}

export async function cancel_student_order({ order_id }: { order_id: string }) {
    //? Get the order list data
    const response = await (await fetch(Student.CancelOrder, {
        method: "POST",
        credentials: "include",
        headers: {
            "Authorization": authorization_string,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            order_id: order_id
        })
    })).json();

    //? Check the result
    if(response.result) {
        return {
            success: true,
            result: response.result,
        };
    }
    else {
        return {
            success: false,
            error: response.error || response.error_code
        };
    }
}

export async function get_order_group_by_id({ order_group_id }: { order_group_id: string }) {
    //? Get the order list data
    const response = await (await fetch(Admin.GetOrderGroupById, {
        method: "POST",
        credentials: "include",
        headers: {
            "Authorization": authorization_string,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            order_group_id: order_group_id
        })
    })).json();

    //? Check the result
    if(response.result && typeof response.result == "object") {
        return {
            success: true,
            result: response.result,
        };
    }
    else {
        return {
            success: false,
            error: response.error || response.error_code
        };
    }
}