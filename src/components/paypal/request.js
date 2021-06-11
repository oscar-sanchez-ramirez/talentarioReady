
// Correo y contraseña
{
    "id": "1XA51906JG010741Y",
        "intent": "CAPTURE",
            "status": "COMPLETED",
                "purchase_units":
    {
        "reference_id": "default", "amount":
        "currency_code": "MXN", "value": "1000.00"
    }, "payee": { "email_address": "oscar@personal.example.com", "merchant_id": "9TV88BTWB8VB6" },
    "description": "Plan Full",
        "soft_descriptor": "PAYPAL *OSCAR",
            "shipping": {
        "name": { "full_name": "John Doe" },
        "address": {
            "address_line_1": "Calle Juarez 1",
                "address_line_2": "Col. Cuauhtemoc", "admin_area_2": "Miguel Hidalgo",
                    "admin_area_1": "Ciudad de Mexico", "postal_code": "11580", "country_code": "MX"
        }
    },
    "payments": {
        "captures": [{
            "id": "0U293071RJ7793647",
            "status": "COMPLETED", "amount": {
                "currency_code": "MXN",
                "value": "1000.00"
            },
            "final_capture": true,
            "seller_protection": {
                "status": "ELIGIBLE",
                "dispute_categories": ["ITEM_NOT_RECEIVED",
                    "UNAUTHORIZED_TRANSACTION"]
            },
            "create_time": "2021-06-11T15:05:04Z",
            "update_time": "2021-06-11T15:05:04Z"
        }]
    }
}],
"payer": {
    "name": { "given_name": "John", "surname": "Doe" },
    "email_address": "sb-zdyl96475522@personal.example.com", "payer_id": "C227MNXW3R3ZN", "address": { "country_code": "MX" }
},
"create_time": "2021-06-11T15:04:00Z",
    "update_time": "2021-06-11T15:05:04Z",
        "links": [{ "href": "https://api.sandbox.paypal.com/v2/checkout/orders/1XA51906JG010741Y", "rel": "self", "method": "GET" }] }



// Tarjeta de credito
{
    "id": "1NS75541UJ984884X",
        "intent": "CAPTURE", "status": "COMPLETED",
            "purchase_units": [{
                "reference_id": "default", "amount": { "currency_code": "MXN", "value": "1000.00" },
                "payee": { "email_address": "oscar@personal.example.com", "merchant_id": "9TV88BTWB8VB6" },
                "description": "Plan Full",
                "soft_descriptor": "PAYPAL *OSCAR",
                "shipping": {
                    "name": { "full_name": "Oscar Sanchez" },
                    "address": {
                        "address_line_1": "virgen de la concepcion",
                        "address_line_2": "Virgencitas", "admin_area_2": "MEXICO/CDMX",
                        "admin_area_1": "MEX", "postal_code": "57300", "country_code": "MX"
                    }
                },
                "payments": {
                    "captures": [{
                        "id": "9YD11319GP351100N",
                        "status": "COMPLETED",
                        "amount": { "currency_code": "MXN", "value": "1000.00" },
                        "final_capture": true, "seller_protection": {
                            "status": "ELIGIBLE",
                            "dispute_categories": ["ITEM_NOT_RECEIVED", "UNAUTHORIZED_TRANSACTION"]
                        },
                        "create_time": "2021-06-11T15:10:08Z", "update_time": "2021-06-11T15:10:08Z"
                    }]
                }
            }], "payer": {
        "name": { "given_name": "Oscar", "surname": "Sanchez" },
        "email_address": "oscar_sr_609@hotmail.com", "payer_id": "UE5N3SE8DF998",
            "address": { "country_code": "MX" }
    },
    "create_time": "2021-06-11T15:09:10Z",
        "update_time": "2021-06-11T15:10:08Z",
            "links": [{
                "href": "https://api.sandbox.paypal.com/v2/checkout/orders/1NS75541UJ984884X",
                "rel": "self", "method": "GET"
            }]
}