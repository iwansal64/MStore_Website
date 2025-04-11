export const order_histories = [
    {
        id: 0,
        student_name: "Ridwan Bagoes Setiawan",
        pickup_place: "Depan Ruang Guru",
        pickup_time: "Setelah Apel Pagi",
        class: "XI ELIND 3",
        products_data: [
            {
                product_id: 0,
                product_name: "Winter Clothes",
                product_image_url: "/default_product.svg",
                product_price: 125500,
                order_quantity: 1,
            },
            {
                product_id: 3,
                product_name: "Mouse IT",
                product_image_url: "/default_product.svg",
                product_price: 1500,
                order_quantity: 2,
            },
        ],
        total_price: 128500,
        status: "Sudah dikonfirmasi",
        status_code: 1,
        created_at: new Date("2025-01-08T20:50:12")
    },
    {
        id: 1,
        student_name: "Ridwan Bagoes Setiawan",
        pickup_place: "Depan Ruang Guru",
        pickup_time: "Setelah Apel Sore",
        class: "XI ELIND 3",
        products_data: [
            {
                product_id: 1,
                product_name: "Seragam Hari Senin",
                product_image_url: "/default_product.svg",
                product_price: 900110,
                order_quantity: 1,
            }
        ],
        total_price: 900110,
        status: "Menunggu Konfirmasi",
        status_code: 0,
        created_at: new Date("2025-02-01T05:25:52")
    },
]