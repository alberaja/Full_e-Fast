import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements,PaymentElement } from '@stripe/react-stripe-js';
import CheckoutForm from "./checkoutform";
import { useStoreVehiculo } from "../../zustand/store";


const stripePromise = loadStripe("pk_test_51OLugQACmPQ0R4zJmCHu91pqTI1MzU23TskkU7Bn7fmiK5onZbnRhbSXgE32rJm2rL5wy3DMYJIEHYfLIlhau0gA000m3ggUpz");

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState('Felipe Garcia Lorca');

//   const {
//     register,
//     //handleSubmit,
//     watch,   // saber valor del checkbox de acepto condiciones     
//     formState: { errors },
// } = useForm();

// Zustand
const rentalDataZustand = useStoreVehiculo( state => state.rentalData );
const datosvehiculoElegidoZustand = useStoreVehiculo(state => state.cocheReserva);

  const datosvehiculoElegido = {
    id: "4",
    alquilable: "S",
    caracteristicas: [
      {
        autonomiaKm: 600,
        año: 2025,
        cajaCambio: "Automatico",
        descripcion: "Coche muy cómodo y rápido y veloz",
        etiquetaECO: true,
        litros: 649,
        maximodeKm: 10000000000,
        numeroBolsasmaletero: 6,
        numplazas: 7,
        tipoVehiculo: "BEV",
        altoConfort: true,
        altasPrestaciones: true,
        perfectoEstado: true,
      },
    ],
    ciudades_vehiculo: ["Madrid", "Zaragoza"],
    extras: [
      {
        gps: false,
        sillaBebe: false,
        proteccionenCarretera: false,
        exenciondeFranquicia: 180,
        opcionSeguroTodoRiesgo: false,
      },
    ],
    fecha_fin: "08-03-2024T20:00",
    fecha_ini: "05-03-2024T07:00",
    geo_oficina: {
      coordinates: { lat: 40.41669, lon: -3.700346 },
    },
    imagen_url: "Default_Nissan_Leaf_0.webp",
    marca_vehiculo: "Nissan",
    modelo_vehiculo: "Leaf",
    marcay_modelo_vehiculo: "Nissan Leaf",
    precio: [
      {
        por1DiaEuros: 200,
        cancelacionGratis: false,
        ofertaEspecial: false,
        precioOferta: 195,
      },
    ],
    tipo_vehiculo: "Moto",
    seguro: [
      {
        coberturaParcialcolisionFranquiciaQty: 1000,
        coberturaParcialcolisionFranquicia: true,
        coberturaRobo: true,
        coberturaRobocolisionFranquiciaQty: 1000,
      },
    ],
  };

  const rentalData = {
    fechaHoraIni: '05-03-2024T07:00',
    fechaHoraFin: '08-03-2024T20:00',
    ciudadesVehiculo: 'Madrid, Zaragoza',
    ciudadesDevolverVehiculo: 'Madrid, Zaragoza',
    numeroDiasReservados: 2,
    totalReserva: 400,
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name,
      }
    });

    // if (error) {
    //   console.error('Error:', error);
    //   return;
    // }

    // const payload = {
    //   datosvehiculoElegido,
    //   rentalData,
    //   paymentMethodId: paymentMethod?.id,
    // };

    const payloadAja = {
      totalAmount: rentalDataZustand?.totalReserva,  //*100 en backend. La API de Stripe lee con centimos y valor, osea 125 = 1,25$ . =cantidad /100. 10000=100€
      receiptEmail: "alberto.aja12@gmail.com",
      paymentMethodId: paymentMethod?.id,
      description: datosvehiculoElegidoZustand?.marcay_modelo_vehiculo + ". Rango de reserva: "+ rentalDataZustand?.fechaHoraIni + rentalDataZustand?.fechaHoraFin //"descripcion del pago del vehiculo",
    };


    try {
      //  por   http://localhost:5173   const response = await fetch('/api/checkout-ismail', {     // fetch('/api/checkout'
      const response = await fetch('http://localhost:8762/stripe-efast/api/efast/v1/stripe-checkout', { // http://localhost:8080/api/stripe-checkout
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadAja), //JSON.stringify(payload),
      });
      //console.log("payload: " +JSON.stringify(payload));

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del titular de la tarjeta *</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Información de la tarjeta *</label>
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe}>Buy</button>
    </form>
    
    // <section className="contenedor-form-tarjeta">
    // <div className="contenedor__form__tarjeta">
    //     <div className="contenedor__form__cabeza__tarjeta">
    //         <h2>Forma de pago</h2>
    //     </div>
    //     <form action="" className="formulario" id="formulario" onSubmit={handleSubmit}>
    //         {/* <!--Nombre del titular de la tarjeta --> */}
    //         <div className="formulario__grupo" id="grupo__nombreTarjeta">
    //             <label for="nombreTarjeta" className="formulario__label">Nombre del titular de la tarjeta <span style={{ color: 'red' }}>*</span></label>
    //             <div className="formulario__grupo-input">
    //                 <input type="text" className="formulario__input" name="nombreTarjeta" id="nombreTarjeta" placeholder="Felipe Garcia Lorca"
    //                     // {...register("nombreTarjeta", {
    //                     //     required: true,
    //                     //     pattern: /^[A-Za-z]+$/i,
    //                     // })}
    //                 />
    //                 {/* {errors?.nombreTarjeta?.type === "required" && <p>El nombre de la tarjeta no puede estar vacio</p>} */}
                   
    //                 {/* input validador de STRIPE */}
    //                 <Elements stripe={stripePromise}>
    //                     {/* aja: margin-left: initial; para alinear el input <CardElement /> al input del Nombre del titular de la tarjeta */}
    //                     <div className="container p-4" style={{ marginLeft: 'initial' }}>
    //                         <div className="row h-100">
    //                             <div className="col-md-4 offset-md-4 h-100">
    //                                 <CheckoutForm />
    //                                 {/* <CardElement /> */}
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </Elements>
    //             </div>
    //             {/* <p className="formulario__input-error">El nombre de la tarjeta no puede estar vacio</p> */}

    //         </div>
    //         </form>
    //     </div>
    //   </section>    
  );
};

function PaymentEl () {
  const stripe = useStripe();
  const elements = useElements();
  const vehiculo = useStoreVehiculo(state => state.cocheReserva);
  const rentalData = useStoreVehiculo( state => state.rentalData );
  const paymentElementOptions = {
    layout: 'tabs',
    paymentMethodOrder: ['card']
  }; 

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (!stripe || !elements) {
      return;
    }    
    //elements.submit()
    console.log(elements);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      //`Elements` instance that was used to create the Payment Element
      type:'card',
      card:elements.getElement(/*PaymentElement*/)
      // confirmParams: {
      //   return_url: "http://localhost:8762/stripe-efast/api/efast/v1/stripe-checkout",
        
      // },
    });

    if (error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }

    confirmPayment({...rentalData,...vehiculo,paymentMethod})
  }


  return (
    
        
        <form onSubmit={handleSubmit}>
        {/* <PaymentForm /> OK custom Form*/}
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button type="submit" onSubmit={handleSubmit} /*disabled={!stripe}*/>Buy</button>
        </form>

    
  );
}


function Payment({amount}){

  // Zustand
const rentalData = useStoreVehiculo( state => state.rentalData );
const elementsOptions = {
    mode: 'payment',
    amount:  rentalData?.totalReserva || 100,
    currency: 'eur',
    appearance: {
      theme: 'stripe',
      variables: {
        colorText: 'black',
      },
    },
  }
    return (
      <Elements stripe={stripePromise} options={elementsOptions}>
      <PaymentEl />
      </Elements>
    )
  }

export default Payment;


async function confirmPayment({totalReserva,paymentMethod,fechaHoraIni,fechaHoraFin,marcay_modelo_vehiculo}){
  
    const payloadAja = {
      totalAmount: totalReserva,  //*100 en backend. La API de Stripe lee con centimos y valor, osea 125 = 1,25$ . =cantidad /100. 10000=100€
      receiptEmail: "alberto.aja12@gmail.com",
      paymentMethodId: paymentMethod?.id,
      description: marcay_modelo_vehiculo + ". Rango de reserva: "+ fechaHoraIni + fechaHoraFin //"descripcion del pago del vehiculo",
    };

    try {
      //  por   http://localhost:5173   const response = await fetch('/api/checkout-ismail', {     // fetch('/api/checkout'
      const response = await fetch('http://localhost:8762/stripe-efast/api/efast/v1/stripe-checkout', { // http://localhost:8080/api/stripe-checkout
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadAja), //JSON.stringify(payload),
      });
      //console.log("payload: " +JSON.stringify(payload));

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response:', data);
      alert("success")
    } catch (error) {
      console.error('Error:', error);
      alert("error")
    }
  


}