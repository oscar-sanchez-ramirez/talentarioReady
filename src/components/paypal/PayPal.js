import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { db } from '../../firebase/firebase-config';

export const PayPal = ({ PEvent, description, plan }) => {

  const paypal = useRef();

  const [state, setState] = useState({});

  const { uid } = useSelector(state => state.auth)


  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: description,
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
          setState(order);
          console.log(order);

          db.ref('users/' + uid).update({

            plan: plan,

          }, (error) => {
            if (error) {
              Swal.fire('Error', error, 'error');
            } else {
              Swal.fire({
                icon: 'success',
                title: 'Plan nuevo',
                showConfirmButton: true,
                timer: 1500,
                timerProgressBar: true,
              });
            }
          });


        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [PEvent, description, plan, uid])

  return (
    <div>
      <div ref={paypal}></div>
      <p>{JSON.stringify(state)}</p>
    </div>
  )
}
