import React, { useState } from 'react'
// import { Sidebar } from '../menu/SideBar';
import { PayPal } from './PayPal';


export const Checkout = ({ PEvent }) => {

    const [checkout, setCheckout] = useState(false);

    return (
        <div className="text-center">
            {/* <Sidebar /> */}
            {checkout ? (
                <PayPal PEvent={PEvent} />
            ) : (
                    <button
                        className="btn btn-azul"
                        onClick={() => { setCheckout(true) }}
                    >
                        Pagar
                    </button>

            )
            }
        </div>
    )
}
