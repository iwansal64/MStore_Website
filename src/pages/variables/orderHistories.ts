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
        status: "Sudak dikonfirmasi",
        status_code: 1,
        created_at: new Date("2025-02-01T05:25:52")
    },
    {
        id: 2,
        student_name: "Ridwan Bagoes Setiawan",
        pickup_place: "Di Kantin",
        pickup_time: "Siang Jam Setengah 1",
        class: "XI ELIND 3",
        products_data: [
            {
                product_id: 8,
                product_name: "Roti Padang",
                product_image_url: "/default_product.svg",
                product_price: 10500,
                order_quantity: 4,
            }
        ],
        total_price: 42000,
        status: "Sudah Dikonfirmasi",
        status_code: 1,
        created_at: new Date("2025-02-01T05:25:52")
    },
    {
        id: 3,
        student_name: "Ridwan Bagoes Setiawan",
        pickup_place: "",
        pickup_time: "",
        class: "XI ELIND 3",
        products_data: [
            {
                product_id: 7,
                product_name: "Nasi Goreng",
                product_image_url: "/default_product.svg",
                product_price: 41500,
                order_quantity: 1,
            },
            {
                product_id: 10,
                product_name: "Nasi Magelangng",
                product_image_url: "/default_product.svg",
                product_price: 15250,
                order_quantity: 3,
            }
        ],
        total_price: 87250,
        status: "Di Cancel",
        status_code: -1,
        created_at: new Date("2025-02-01T05:25:52")
    },
]