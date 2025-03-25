import { Admin } from "./base";


const authorization_string = "90ySD1y9fH299gH90ChOZgvdasoi";

export async function send_notification({ title, content, student_id }: { title?: string, content?: string, student_id: string }) {
    const notificationResponse = await (await fetch(Admin.SendNotification, {
        method: "POST",
        credentials: "include",
        headers: {
            "Authorization": authorization_string,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            content: content,
            student_id: student_id
        })
    })).json();
    
    if(notificationResponse.result) {
        return {  
            success: true,
            result: notificationResponse.result
        }
    }
    else {
        return {
            success: false,
            error: notificationResponse.error_code || notificationResponse.error
        }
    }
}