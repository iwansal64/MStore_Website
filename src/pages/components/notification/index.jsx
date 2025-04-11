import React, { useEffect, useState } from "react";
import NavigateBar from "../navbar";
import strftime from "strftime";
import { getNotificationAPI } from "../../api/student";
import Loader from "../loader";
import { get_development_mode } from "../../../javascript/client_function";
import { dummy_notifications } from "../../variables/notifications";

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([
        {
            id: "",
            title: "Hi There!",
            content: "",
            read: false,
            created_at: new Date()
        },
    ]);
    const [isLoaded, setIsLoaded] = useState(false);
    const today_date = (new Date()).getDate();
    const is_development_mode = get_development_mode();


    //? Get notification data
    useEffect(() => {
        if(is_development_mode) {
            setNotifications(dummy_notifications);
            setTimeout(() => {
                setIsLoaded(true);
            }, Math.random() * 1000 + 500);
        }
        else {
            getNotificationAPI().then(response => {
                if(response.success) {
                    setNotifications(response.result);
                    setIsLoaded(true);
                }
                else {
                    alert("There's something wrong. Please contact developer");
                    console.error(response.error);
                }
            });
        }
    }, []);
    
    return <>
        <NavigateBar is_must_login={true} />
        <div className="p-4">
            <h1 className="text-3xl font-bold">Notification</h1>
            <hr className="mt-2 mb-2"/>
            <div className="flex flex-col gap-2">
                {isLoaded?notifications.map(notification_data => {
                    return <button onClick={() => { window.location.href = `/notification/detail?id=${notification_data.id}`; }} className={`bg-[#555] p-4 rounded-xl text-left ${notification_data.read?"opacity-50":""}`}>
                        <p className={`text-2xl truncate ${notification_data.read?"":"font-bold"}`}>{notification_data.title}</p>
                        <p className="text-base truncate">{notification_data.content}</p>
                        <p className="mt-4">{strftime(notification_data.created_at.getDate()==(today_date)?"Today - %H:%M:%S":"%d/%m/%Y - %H:%M:%S", notification_data.created_at)}</p>
                    </button>
                }):
                <Loader />}
            </div>
        </div>
    </>
};

export default NotificationPage;