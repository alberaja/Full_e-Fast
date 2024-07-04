import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements,PaymentElement } from '@stripe/react-stripe-js';
import CheckoutForm from "./checkoutform";
import { useStoreVehiculo } from "../../zustand/store";
import { useNavigate } from "react-router-dom";


const stripePromise = loadStripe("pk_test_51OLugQACmPQ0R4zJmCHu91pqTI1MzU23TskkU7Bn7fmiK5onZbnRhbSXgE32rJm2rL5wy3DMYJIEHYfLIlhau0gA000m3ggUpz");


function PaymentEl ( {email} ) {
  const stripe = useStripe();
  const elements = useElements();
  const vehiculo = useStoreVehiculo(state => state.cocheReserva);  
  const paymentElementOptions = {
    layout: 'tabs',
    paymentMethodOrder: ['card']
  }; 

    // Zustand
    const rentalDataZustand = useStoreVehiculo( state => state.rentalData );
    const datosvehiculoElegidoZustand = useStoreVehiculo(state => state.cocheReserva); 
    
    let navigate = useNavigate()

      const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }

        //setLoading(true)

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit()
        if (submitError) {            
            return
        }      


        // NO permitir guardar datos enMySQL ni pagar, si datos(fecha_hora_ini ,fecha_hora_fin, ciudadorigen ) son nulos
        const isObjectEmpty = (obj) => {
          return Object.keys(obj).length === 0;
        };
        if (
          isObjectEmpty(rentalDataZustand.ciudadesVehiculo) ||
          isObjectEmpty(rentalDataZustand.fechaHoraIni) ||
          isObjectEmpty(rentalDataZustand.fechaHoraFin)
        ) {
          navigate("/");
        }


        const payloadAja = {
          totalAmount: 55,//rentalDataZustand?.totalReserva,  //*100 en backend. La API de Stripe lee con centimos y valor, osea 125 = 1,25$ . =cantidad /100. 10000=100€
          receiptEmail: "alberto.aja12@gmail.com",
          description: "kkk"//datosvehiculoElegidoZustand?.marcay_modelo_vehiculo + ". Rango de reserva: "+ rentalDataZustand?.fechaHoraIni + rentalDataZustand?.fechaHoraFin //"descripcion del pago del vehiculo",
        };        
        const totalAmount = rentalDataZustand?.totalReserva //110
        const receiptEmail =  email ? email : "alberto.aja12@gmail.com"; //mail asociado en mi Stripe a Felipe Garcia Lorca
        //precio con oferta
        const hasSpecialOffer = datosvehiculoElegidoZustand?.precio[0].ofertaEspecial === true;
        const precio = hasSpecialOffer ? datosvehiculoElegidoZustand?.precio[0].precioOferta : datosvehiculoElegidoZustand?.precio[0].por1DiaEuros;
        const description = datosvehiculoElegidoZustand?.marcay_modelo_vehiculo + "idvehiculo: "+ datosvehiculoElegidoZustand?.id + ". Rango de reserva: "+ rentalDataZustand?.fechaHoraIni +" a "+ rentalDataZustand?.fechaHoraFin + ", que son en nº dias: " + rentalDataZustand?.numeroDiasReservados + ". Precio por Dia: "+ precio+ "€"
        
        const response = await fetch("http://localhost:8762/stripe-efast/api/efast/v1/stripe-checkout-2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },            
            body: JSON.stringify({totalAmount, receiptEmail, description})  // payloadAja  receiptEmail, description
        }                
      )
        if (!response.ok) return        
        const data = await response.json()
        const clientSecret = data.secret
        //const { client_secret: clientSecret } = await response.json()

        // Use the clientSecret and Elements instance to confirm the setup
        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://localhost:3005/reservaFinalizada?email=${email}`
                //return_url: 'http://localhost:3005/reservaFinalizada' //'https://example.com/order/123/complete',
            },
            // Uncomment below if you only want redirect for redirect-based payments
             //redirect: "if_required",  //descomentar si no quiero redirigir
        })

        if (error) {
            //console.log(error) 
            alert("entraaa en error");           
            return
        }

        console.log("Payment Success")
    }



  return (
    <form onSubmit={handleSubmit}>
      {/* <PaymentForm /> OK custom Form*/}
      {/* <div>
        <label>Nombre del titular de la tarjeta *</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>       */}
      {/* <div><p>email {email}</p></div>   */}
      <PaymentElement
        id="payment-element"
        options={paymentElementOptions} /*email={email}*/
      />
      <div className="flex flex-col items-center">
        <button
          type="submit"
          onSubmit={handleSubmit}
          disabled={!stripe}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
          Pagar la reserva
        </button>
      </div>
    </form>
  );
}


function Payment({amount, email, hidden}){  
  // Zustand
  const rentalData = useStoreVehiculo((state) => state.rentalData);
  if(hidden) return null
  const elementsOptions = {
    mode: "payment",
    amount: rentalData?.totalReserva || 100,
    currency: "eur",
    appearance: {
      theme: "stripe",
      variables: {
        colorText: "black",
      },
    },
  };

  return (
    <div className="flex flex-col  w-screen justify-center items-center">
      <div className="flex flex-col items-stretch sm:w-[30rem] md:w-[40rem] lg:w-[50rem]  p-10 pt-5 bg-blue-100 rounded-lg shadow-xl border-blue-500">
        <h3 className="flex  text-3xl w-full justify-center mb-5 font-bold">
          Forma de pago
        </h3>        
          { rentalData?.ciudadesVehiculo && rentalData?.ciudadesVehiculo.trim() !== "" ? ( <span>Oficina de recogida: {rentalData?.ciudadesVehiculo}.</span> ) : ("")}
          {/* { rentalData?.ciudadesVehiculo && rentalData?.ciudadesDevolverVehiculo  && rentalData?.ciudadesVehiculo === rentalData.ciudadesDevolverVehiculo ? ( <span>Oficina de recogida y devolución de {rentalData?.ciudadesVehiculo}.</span> ) : ("")}
          { rentalData?.ciudadesVehiculo && rentalData?.ciudadesDevolverVehiculo==null  && rentalData?.ciudadesVehiculo ? ( <span>Oficina de recogida y devolución de {rentalData?.ciudadesVehiculo}.</span> ) : ("")} */}
          { rentalData?.ciudadesDevolverVehiculo && rentalData.ciudadesDevolverVehiculo.trim() !== "" && rentalData.ciudadesDevolverVehiculo !== rentalData?.ciudadesVehiculo ? ( <span>Oficina de devolución: {rentalData.ciudadesDevolverVehiculo} .</span> ) : ("")}
        <h4>Durante {rentalData.numeroDiasReservados} días.</h4>
        <h4 className="flex flex-col items-center mb-2">Total a pagar: <b>{rentalData?.totalReserva} €</b></h4>
        <Elements stripe={stripePromise} options={elementsOptions}>
          <PaymentEl email={email} />
        </Elements>
      </div>
    </div>
  );
}

export default Payment;


