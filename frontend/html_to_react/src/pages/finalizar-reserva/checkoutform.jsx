
// para STRIPE
// import "bootswatch/dist/lux/bootstrap.min.css";    // bootswatch=bootstrap   afecta a estilos de toda web ojo!!
import React, { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import {
    //   Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

export default function CheckoutForm() {

    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
        setLoading(true);

        if (!error) {
            // console.log(paymentMethod)
            const { id } = paymentMethod;
            try {
                // Este id es el que genera Stripe y que es necesario para luego crear el intent de peticion de pago desde el server/backend
                console.log("aja: id del pago: " + id);
                const { data } = await axios.post(
                    "http://localhost:3001/api/checkout",
                    {
                        id,
                        amount: 10000, //cents   =10xnº€  PDTE recuperar aqui el valor desde back del Price
                    }
                );
                // data q se va a enviar al backend(server)
                console.log(data);

                // vaciar nº de tarjeta introducido
                elements.getElement(CardElement).clear();
            } catch (error) {
                console.log(error);
            }
            // ha terminado, quitar el loader spinner
            setLoading(false);
        }
    };

    console.log(!stripe || loading);

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            {/* Product Information */}
            {/* <img
                // src="https://www.sociallovers.cat/wp-content/uploads/2019/10/alquiler-portatil-gaming.jpg"
                src="https://img.freepik.com/vector-premium/color-coche-ciudad-pequena-retro_510486-386.jpg" style={{ width: '100%' }}
                alt="Corsair Gaming Keyboard RGB"
                className="img-fluid"
            /> */}

            {/* <h3 className="text-center my-2">Price: 100$</h3> */}
            <label className="formulario__label">Información de la tarjeta <span style={{ color: 'red' }}>*</span></label>

            {/* User Card Input */}
            <div className="form-group">
                <CardElement />
            </div>

            {/* que cargue un Spinner de Bootstrap(bootswatch) al enviar el procesar el pago */}
            <button disabled={!stripe} className="btn btn-success">
                {loading ? (
                    <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    "Buy"
                    // ""
                )}
            </button>
        </form>
    );

}