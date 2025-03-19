import React, { useEffect } from "react"
import { get_admin_stats } from "../../api/stats";

export default function AutoUpdateStats() {
    const productsByOrder = localStorage.getItem("products_by_order");

    useEffect(() => {
        if(!productsByOrder) {
            get_admin_stats().then(value => {
                if(value.success) {
                    localStorage.setItem("total_revenue", JSON.stringify(value.result.total_revenue));
                    localStorage.setItem("total_orders", JSON.stringify(value.result.total_orders));
                    localStorage.setItem("total_students_ordered", JSON.stringify(value.result.total_students_ordered));
                    localStorage.setItem("total_revenue_today", JSON.stringify(value.result.total_revenue_today));
                    localStorage.setItem("total_orders_today", JSON.stringify(value.result.total_orders_today));
                    localStorage.setItem("total_orders_by_date", JSON.stringify(value.result.total_orders_by_date));
                    localStorage.setItem("products_by_order", JSON.stringify(value.result.products_by_order));
                    window.location.reload();
                }
            })
        }
    }, []);

    
    return <></>
}