import React, { useEffect, useState } from "react"
import NavigateBar from "../../navbar";
import { useSearchParams } from "next/navigation";
import { getNotificationByIdAPI } from "../../../api/student";
import strftime from "strftime";
import Loader from "../../loader";

const DetailNotificationPage = () => {
    const searchParams = useSearchParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const notificationId = searchParams.get("id");
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