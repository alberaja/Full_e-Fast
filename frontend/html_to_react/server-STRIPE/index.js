const express = require("express");
const Stripe = require("stripe");
// const stripe = new Stripe("<your_secretkey_here>");
const stripe = new Stripe("sk_test_51OLugQACmPQ0R4zJRoLZOy3QVBQctHL94lANJPMDiovwJIynnOvYwHcpzNrq063yGkP8lBfaha9Fd2lVZdSpt1iX008UjecHBY");

const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3005" }));  // 3000 to 3005
app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  console.log("body del request:  "+ JSON.stringify(req.body));
  // res.send('recibido');
  // you can get more data to find in a database, and so on
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Gaming Keyboard",  // consultarlo a BBDD
      payment_method: id,
      confirm: true, //confirm the payment at the same time
      "automatic_payment_methods": {
        "enabled": true,
        "allow_redirects": "never"
      }   
    });

    console.log(payment);

    return res.status(200).json({ message: "Successful Payment" });
  } catch (error) {
    console.log(error);
    // formatear el error a mostrar
    return res.json({ message: error.raw.message });
  }
});

app.listen(3001, () => {
  console.log("Server on port", 3001);
});

// inicializar server:
// node .\server\index.js

// ej de BODY que se envia, lo valido en Postman, coleccion: STRIPE-Reactjs
// {
//   "id": "pm_1OM7p2ACmPQ0R4zJ3AQNdvev",   //ideDelPago
//   "amount": 500 //cents   =10xnº€  PDTE recuperar aqui el valor desde back del Price
// }

// aja: ej de pago ok 
//  sacado del Historial de pagos desde Stripe web:
// {
//   "currency": "USD",
//   "description": "Gaming Keyboard",
//   "payment_method": "pm_1OM8t7ACmPQ0R4zJUngwpjCQ",
//   "confirm": "true",
//   "amount": "10000",
//   "automatic_payment_methods": {
//     "enabled": "true",
//     "allow_redirects": "never"
//   }
// }

// id(el q guarda stripe, no el q genera stripe desde el Front mio donde invoco stripe) stripe: pi_3OM8t7ACmPQ0R4zJ1h16JOri

// console.log(payment);    :

// body del request:  [object Object]
// {
//   id: 'pi_3OM8t7ACmPQ0R4zJ1h16JOri',
//   object: 'payment_intent',
//   amount: 10000,
//   amount_capturable: 0,
//   amount_details: { tip: {} },
//   amount_received: 10000,
//   application: null,
//   application_fee_amount: null,
//   automatic_payment_methods: { allow_redirects: 'never', enabled: true },
//   canceled_at: null,
//   cancellation_reason: null,
//   capture_method: 'automatic',
//   client_secret: 'pi_3OM8t7ACmPQ0R4zJ1h16JOri_secret_gLUgcDVsjonfw3ln1DtrhYtn1',
//   confirmation_method: 'automatic',
//   created: 1702298829,
//   currency: 'usd',
//   customer: null,
//   description: 'Gaming Keyboard',
//   invoice: null,
//   last_payment_error: null,
//   latest_charge: 'ch_3OM8t7ACmPQ0R4zJ1tM8Np2B',
//   livemode: false,
//   metadata: {},
//   next_action: null,
//   on_behalf_of: null,
//   payment_method: 'pm_1OM8t7ACmPQ0R4zJUngwpjCQ',
//   payment_method_configuration_details: { id: 'pmc_1OM8QiACmPQ0R4zJVSVaZbCP', parent: null },
//   payment_method_options: {
//     card: {
//       installments: null,
//       mandate_options: null,
//       network: null,
//       request_three_d_secure: 'automatic'
//     },
//     link: { persistent_token: null }
//   },
//   payment_method_types: [ 'card', 'link' ],
//   processing: null,
//   receipt_email: null,
//   review: null,
//   setup_future_usage: null,
//   shipping: null,
//   source: null,
//   statement_descriptor: null,
//   statement_descriptor_suffix: null,
//   status: 'succeeded',
//   transfer_data: null,
//   transfer_group: null
// }