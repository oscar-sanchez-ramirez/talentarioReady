import React, { useEffect, useRef, useState } from 'react'

export const PayPal = ({PEvent}) => {

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
                  value: PEvent,
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
  }, [PEvent])

  return (
    <div>
      <div ref={paypal}></div>
      <p>{JSON.stringify(state)}</p>
    </div>
  )
}
