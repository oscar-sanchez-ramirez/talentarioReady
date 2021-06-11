import React, { useEffect, useRef } from 'react'
import { useState } from 'react';

export const PayPal = () => {

    const paypal = useRef();

   const [state, setState] = useState({});
    

    useEffect(() => {
        window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "Plan Full",
                  amount: {
                    currency_code: "MXN",
                    value: 1000.0,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log('pay');
            setState(order);
            console.log(order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
    }, [])

    return (
        <div>
            <div ref={paypal}></div>
            <p>{JSON.stringify(state)}</p>
        </div>
    )
}
