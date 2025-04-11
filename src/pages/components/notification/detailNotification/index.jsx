import React, { useEffect, useState } from "react"
import NavigateBar from "../../navbar";
import { useSearchParams } from "next/navigation";
import { getNotificationByIdAPI } from "../../../api/student";
import strftime from "strftime";
import Loader from "../../loader";
import { get_development_mode } from "../../../../javascript/client_function";
import { dummy_notifications } from "../../../variables/notifications";

const DetailNotificationPage = () => {
    const searchParams = useSearchParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");

    const [isLoaded, setIsLoaded] = useState(false);

    const is_development_mode = get_development_mode();

    useEffect(() => {
        const notificationId = searchParams.get("id");
        if(is_development_mode) {
            const notification_data = dummy_notifications.find(value => value.id == notificationId);
            setTitle(notification_data.title);
            setContent(notification_data.content);
            setDate(strftime("%d/%m/%Y - %H:%M:%S", notification_data.created_at));
            setTimeout(() => {
                setIsLoaded(true);
            }, Math.random() * 2000 + 500);
        }
        else {
            getNotificationByIdAPI({ notification_id: notificationId }).then(response => {
                if(response.success) {
                    const result = response.result;
                    setTitle(result.title);
                    setContent(result.content);
                    setDate(strftime("%d/%m/%Y - %H:%M:%S", new Date(result.created_at)));
                    setTimeout(() => {
                        setIsLoaded(true);
                    }, 2000);
                }
                else {
                    alert("There's an error when trying to get notification details data");
                }
            })
        }
    }, []);


    return <>
        <NavigateBar is_must_login={true} />
        {isLoaded?<div className="bg-transparent w-100vwh h-80vdh p-4 flex flex-col gap-4">
            <div className="p-4 bg-[#555] flex justify-between rounded-xl">
                <h1 className="text-3xl">{title}</h1>
                <p className="text-sm">{date}</p>
            </div>
            <div className="p-4 bg-[#555] min-h-[50vh] rounded-xl">
                <p className="text-xl">{content}</p>
            </div>
        </div>:
        <Loader />}
    </>
}

export default DetailNotificationPage;