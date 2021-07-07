import React from 'react'

export const CreateOrder = () => {


    // const handleCreateOrder = async () => {

    //     const url = `https://us-central1-talentario-a3d9a.cloudfunctions.net/api/createOrder/ATE1qnSa8zaXOXbQGXqsRJcVW4L8PZm1eIm4Oe-PdhEq_zX4PZ_6bG4da9ZvaADL7QOKP5fMkES_pzql/EFq9sxWa_wV0MHZKyior9HtB3uuDTMYIIGyKn43Vh5EpXPPDOohXR-S_erNGwGV4yo8_cXf2W6HYqtoh`;
    //     const res = await fetch(url, {
    //         method: 'POST',
    //         mode: 'no-cors',
    //         redirect: 'follow',
    //     });
    //     console.log(res);

    // }

    // useEffect(() => {
    //     handleCreateOrder();
    // }, [])

    return (
        <form
            className="text-center"
            action="https://us-central1-talentario-a3d9a.cloudfunctions.net/api/createOrder"
            method="POST"
            httpEquiv="Content-Security-Policy"
            content="default-src *; style-src 'self' 'unsafe-inline'; script-src * 'self' 'unsafe-inline'  localhost:* https://us-central1-talentario-a3d9a.cloudfunctions.net/api/createOrder 'unsafe-eval';"
        >
            <button type="submit" className="btn btn-azul">
                Pagar
            </button>
        </form>
    )
}
