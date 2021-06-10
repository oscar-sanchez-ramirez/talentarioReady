import React, { useState } from 'react'
import { Sidebar } from '../menu/SideBar';
import { PayPal } from './PayPal';


export const Checkout = () => {

    const [checkout, setCheckout] = useState(false);

    return (
        <div className="container">
            <Sidebar />
            <hr style={{ marginTop: '150px'  }}/>
            { checkout ? (
                <PayPal />
            ) : (
                <button
                    className="btn btn-outline-primary"
                    onClick={() => { setCheckout(true) }}
                >
                    Checkout
                </button>
            )
            }
        </div>
    )
}
