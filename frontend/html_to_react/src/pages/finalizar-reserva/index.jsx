// src/components/SearchResults.js
import React , { useState } from 'react';
import './teslaReservar.css';
import { useLocation } from "react-router-dom";

//ok antes import './buscarVehiculo.css';
import { Link, Route } from 'react-router-dom';

// validar formularios
import { useForm } from "react-hook-form";
// import { ErrorsMap } from './errors';

// para STRIPE
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements
} from "@stripe/react-stripe-js";
import CheckoutForm from './checkoutform';
import { useStoreVehiculo } from '../../zustand/store';
import Card2 from './../../components/body/card2.jsx'
import { PostData } from './helpers/Postdata.js';
import Swal from 'sweetalert2';

const FinalizarReserva = ({ results }) => {

    // Zustand
    const carData = useStoreVehiculo( state => state.carData );
    //const cardVehicleData = useStoreVehiculo( state => state.cardVehicleData );
    const rentalData = useStoreVehiculo( state => state.rentalData );

    // ver que llega
    // console.log(results.Cars);
    const location = useLocation();   // visualizar los estados que llegan en una ruta de react router dom
    console.log(location.state);    //se muestra cada click en guardar datos
    // ok let numdiasReservados = location.state.numdiasReservados;
    // ok let coche = location.state.coche;  =marcaModelo
    // ok let precio = location.state.price;    // = precioDiaEur
    // ok let precioAlquilerCalculado = location.state.precioAlquilerCalculado;
    // ok let numPlazas = location.state.numPlazas;
    // ok let capLitros = location.state.capLitros;
    // ok let autonomiaKm = location.state.autonomiaKm;

    // con Zustand
    // let numdiasReservados = carData.numeroDiasReservados;
    // let coche = carData;
    // let precio = carData.precioPorDia;
    // let precioAlquilerCalculado = carData.totalReserva;
    let numdiasReservados = carData.numeroDiasReservados;//.toString();
    let marcaModelo = carData.vehiculoMarcaModelo; //carData.toString();
    // let precio = carData.precioPorDia;    

    //let precioAlquilerCalculado = carData.totalReserva;
    let precioAlquilerCalculado = rentalData.totalReserva;

    // console.log("cardVehicleData", cardVehicleData)
    console.log("rentalData", rentalData)
    //const vehiculoElegido = results?.vehiculos?.map(coche => <Card2 key={coche.id} {...coche}></Card2>)
    const datosvehiculoElegido = useStoreVehiculo(state => state.cocheReserva)
    // console.log("datosvehiculoElegido", datosvehiculoElegido)    
    const vehiculoElegido = <Card2 {...datosvehiculoElegido}></Card2>

    const hasSpecialOffer = datosvehiculoElegido?.precio[0].ofertaEspecial === true;
    const precio = hasSpecialOffer ? datosvehiculoElegido?.precio[0].precioOferta : datosvehiculoElegido?.precio[0].por1DiaEuros;

    const {
        register,
        handleSubmit,
        watch,   // saber valor del checkbox de acepto condiciones     
        formState: { errors },
    } = useForm();


    // form submit function which will invoke after successful validation
    // const onSubmit = (data) => {
    //     alert(JSON.stringify(data));
    // };

    // console.log(watch("ejemplo")); // to watch individual input by pass the name of the input
    // watch para obtener el valor actual del checkbox
    const aceptoTerminos = watch('terminos', false);  //o inicializarlo a false. le pongo 5 para no muestre el texto por default

    // para STRIPE
    const stripePromise = loadStripe("pk_test_51OLugQACmPQ0R4zJmCHu91pqTI1MzU23TskkU7Bn7fmiK5onZbnRhbSXgE32rJm2rL5wy3DMYJIEHYfLIlhau0gA000m3ggUpz");


    const [formData, setFormData] = useState({
        // Aquí puedes inicializar el estado de tus campos de formulario si es necesario
        //nombre: "",       
        // Otros campos de formulario aquí
         //email: "",
      });
    
    // Añade los valores a enviarse luego desde handleSubmitForm()
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const showAlertKoForm = () => {
         // reserva o conductorFormulario contiene valores nulos o campos vacios
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Rellena el formulario!",
          footer: 'Gracias =)'
        });
      };

     const handleSubmitForm = (e) => {
        e.preventDefault();
        
        console.log("precioPorDiaaaa: ", precio, 
                    " numeroDiasReservados:", rentalData.numeroDiasReservados,
                    " totalReserva:", rentalData.totalReserva,
                    " vehiculoId:", datosvehiculoElegido?.id,
                    " vehiculoMarcaModelo:", datosvehiculoElegido?.marcay_modelo_vehiculo,
                    " fechaHoraIni:", rentalData.fechaHoraIni,
                    " fechaHoraFin:", rentalData.fechaHoraFin,
                    " ciudadesVehiculo:", rentalData.ciudadesVehiculo,
                    " ciudadesDevolverVehiculo:", rentalData.ciudadesDevolverVehiculo,
                    //+datos FORMULARIO  
        )
        // Aquí puedes realizar las acciones necesarias con los datos del formulario
        console.log("aceptoTerminos: ", aceptoTerminos);
        console.log("Valores de la reserva en formData: ", formData);
        if(aceptoTerminos){
            // enviar POST
            const reserva = {precio, numeroDias: rentalData["numeroDiasReservados"],
                totalReserva: rentalData["totalReserva"], vehiculoId: datosvehiculoElegido["id"],
                vehiculoMarcaModelo: datosvehiculoElegido["marcay_modelo_vehiculo"], fechaHoraIni: rentalData["fechaHoraIni"],
                fechaHoraFin: rentalData["fechaHoraFin"], ciudadesVehiculo: rentalData["ciudadesVehiculo"],
                ciudadesDevolverVehiculo: rentalData["ciudadesDevolverVehiculo"],
                comentarios: formData["comentarios"]
             }
             const conductorFormulario = {
                nombre: formData.firstName, apellidos: formData.lastName,
                dni: formData.dni, telefono: formData.telephone,
                email: formData.email,
             }
                console.log(reserva);
                console.log("conductorFormulario: ", conductorFormulario);
            //PostData(reserva, conductorFormulario);
            // Función para verificar que un objeto no tenga propiedades nulas o vacías
            if (isObjectValid(reserva) && isObjectValid(conductorFormulario)) {
                console.log("objetos enviados Validos! Llamada a PostData()");
                PostData(reserva, conductorFormulario);
            } else {
                showAlertKoForm();//console.error("reserva or conductorFormulario contains null or empty fields.");

            }
        } /*else {
            alert("Debe aceptar la política de privacidad para poder guardar su reserva.");
        }*/
        // onSubmit(formData);
      };

    const isObjectValid = (obj) => {
        //return Object.values(obj).every(value => value !== null && value !== '');
         // Excepciones específicas para ciertos campos
        const exceptions = [ "comentarios", "email",   // campos del form no requeridos obligatorios
                "ciudadesDevolverVehiculo", "ciudadesVehiculo", "fechaHoraFin", "fechaHoraIni", "numeroDias"];

        // Verificar todas las propiedades, excepto las excepciones
        return Object.entries(obj).every(([key, value]) => {
            if (exceptions.includes(key)) {
            return true; // Ignorar estas propiedades
            }
            return value !== null && value !== '';
        });
    };

    return (
        // /finalizarReserva
        // <main>
        <>
            {/* <!--Elección--> */}
            {/* <!--Elección--> */}
            <section className="contenedor__eleccion">
                <div className="contenedor__eleccion__tu">
                    <h3 className="contenedor__eleccion-parrafo">Finalización de la reserva</h3>
                </div>
            </section>
            {/* <!--Coche Tesla--> */}
            {/* <section className="contenedor__caja__vehiculos__tesla" id="vehiculos">
                <div className="contenedor__caja__vehiculos__dinamico__tesla">
                    <div className="caja__tesla">
                        <a href="teslaCaracteristicas.html" className="caja__tesla__imagen">
                            <img src="/images/tesla3.png" className="imagenCoche" />
                        </a>
                    </div>
                </div>
                <section className="producto__tesla">
                    <div className="producto__tesla__parrafo">
                        <h1 className="producto__tesla__parrafo">{marcaModelo}</h1>
                    </div>
                    <section className="producto__tesla__caracteristicas">
                        <div className="producto__tesla__parrafo__caracteristicas">
                            <div className="producto__tesla__parrafo__plazos">
                                <p className="producto__tesla__parrafo__plazas-p"><img src="/images/icono-user.svg" /> 5 plazas</p>
                            </div>
                            <div className="producto__tesla__parrafo__plazos">
                                <p className="producto__tesla__parrafo__litros-p"><img src="/images/equipaje.svg" /> 649 litros</p>
                            </div>
                            <div className="producto__tesla__parrafo__plazos">
                                <p className="producto__tesla__parrafo__autonomia-p"><img src="/images/bateria.svg" /> 547km autonomía</p>
                            </div>
                        </div>
                    </section>
                </section>
                <section className="barra__tesla">
                    <div className="barra__tesla__precio">
                        <div className="barra__tesla__precio__dia">
                            <p className="precio__dia">Precio por <span>1</span> día</p>
                            <h3 className="precio__dia__tesla-especifico"><span>{precio}</span>€</h3>
                            <img className="iconoCheck" src="images/check.svg" />
                            <p className="barra__precio-Cancelacion__gratuita">Cancelación gratuita</p>
                        </div>
                    </div>
                    <div className="barra__oferta__tesla">
                        <img className="imagen__llave" src="/images/entrega__llave.png" />
                    </div>
                </section>
            </section> */}
            { vehiculoElegido }
            {/* <!--contenedor__caja de imagenes Coche--> */}

            {/* Zustand */}
            {/* {"TODO Zustand: "+ JSON.stringify(carData)}   carData.vehiculoId   */}
            {"datosvehiculoElegido "+ JSON.stringify(datosvehiculoElegido)} 
            {/* {"TODO Zustand: "+ JSON.stringify(cardVehicleData)}  */}
            {/* {"Algunos: "+ JSON.stringify(cardVehicleData.vehiculoId) + JSON.stringify(cardVehicleData.vehiculoMarcaModelo)+ ", "+
                          JSON.stringify(cardVehicleData.fechaHoraIni) + JSON.stringify(cardVehicleData.fechaHoraFin)+ ", "+
                          JSON.stringify(cardVehicleData.ciudadesVehiculo) + JSON.stringify(cardVehicleData.ciudadesDevolverVehiculo)+", "+
                          JSON.stringify(cardVehicleData.numeroDiasReservados) + JSON.stringify(cardVehicleData.precioPorDia)+", "+
                          JSON.stringify(cardVehicleData.numPlazas) + JSON.stringify(cardVehicleData.totalReserva) }              */}
            {" , rentalData Zustand: "+ JSON.stringify(rentalData)}

            {/* <!--FORMULARIO luego de imagen Coche--> */}
            <section className="contenedor-form">
                <div className="contenedor__form">
                    <div className="contenedor__form__cabeza">
                        <h2>Datos del conductor principal</h2>
                    </div>
                    {/* seguir https://codesandbox.io/p/sandbox/form-reservar-wr54px?file=%2Fsrc%2FApp.js%3A22%2C31-22%2C39 */}
                    <form /*action=""*/ id="form" className="form" /*onSubmit={handleSubmit(onSubmit)}*/ onSubmit={handleSubmitForm}>
                        {/* Nombre */}
                        <div className="form__grupo" id="grupo__nombre">
                            <label htmlFor="nombre" className="form__label">
                                * Nombre
                            </label>
                            <div className="form__grupo-input">
                                {/* <input
                                    type="text"
                                    className="form__input"
                                    name="nombre"
                                    id="nombre"
                                    placeholder="felipe"
                                /> */}
                                <input
                                    className="form__input"
                                    name="nombre"
                                    //id="nombre"
                                    placeholder="felipe"
                                    /*defaultValue="Alberto"*/
                                    {...register("firstName", {
                                        required: true,
                                        maxLength: 40,
                                        pattern: /^[A-Za-z]+$/i,
                                    })}
                                    //value={formData.nombre}
                                    onChange={handleInputChange}
                                />
                                {/* {
                                    ErrorsMap.firstName[errors?.firstName?.type] !== undefined && (
                                        <p>{ErrorsMap.firstName[errors?.firstName?.type]}</p>
                                    )
                                } */}
                                {errors?.firstName?.type === "required" && (
                                    <p>El nombre no puede estar vacio</p>
                                )}
                                {errors?.firstName?.type === "maxLength" && (
                                    <p>Nombre hasta 40 carácteres</p>
                                )}
                                {errors?.firstName?.type === "pattern" && (
                                    <p>Caracteres alfabéticos sólo</p>
                                )}
                                <img className="form__validacion-estado" alt="Validación de estado" />
                            </div>
                            {/* <p className="form__input-error">El nombre no puede estar vacío</p> */}
                        </div>
                        {/* Apellidos */}
                        <div className="form__grupo" id="grupo__apellidos">
                            <label htmlFor="apellido" className="form__label">
                                * Apellidos
                            </label>
                            <div className="form__grupo-input">
                                {/* <input
                                    type="text"
                                    className="form__input"
                                    name="apellidos"
                                    id="apellidos"
                                    placeholder="garcia lorca"
                                /> */}
                                <input
                                    className="form__input"
                                    name="apellidos"
                                    id="apellidos"
                                    placeholder="garcia lorca"
                                    {...register("lastName", {
                                        required: true,
                                        pattern: /^[A-Za-z]{3,50} [A-Za-z]{3,70}$/i,
                                    })}
                                    onChange={handleInputChange}
                                />
                                {errors?.lastName?.type === "required" && <p>Introduce tus apellidos</p>}
                                {errors?.lastName?.type === "pattern" && <p>Deben ser dos apellidos</p>}
                                <img className="form__validacion-estado" alt="Validación de estado" />
                            </div>
                            {/* <p className="form__input-error">Deben ser dos apellidos</p> */}
                        </div>
                        {/* DNI */}
                        <div className="form__grupo" id="grupo__dni">
                            <label htmlFor="dni" className="form__label">
                                * DNI
                            </label>
                            <div className="form__grupo-input">
                                {/* <input
                                    type="text"
                                    className="form__input"
                                    name="dni"
                                    id="dni"
                                    placeholder="46361585W"
                                /> */}
                                <input
                                    className="form__input"
                                    name="dni"
                                    id="dni"
                                    placeholder="46361585W"
                                    {...register("dni", {
                                        required: true,
                                        pattern: /^\d{8}[a-zA-Z]$/i,
                                    })}
                                    onChange={handleInputChange}
                                />
                                {errors?.dni?.type === "pattern" && <p>Completa el DNI y no pongas - </p>}
                                <img className="form__validacion-estado" alt="Validación de estado" />
                            </div>
                            {/* <p className="form__input-error">Completa el DNI y no pongas -</p> */}
                        </div>
                        {/* Teléfono */}
                        <div className="form__grupo" id="grupo__telefono">
                            <label htmlFor="telefono" className="form__label">
                                * Teléfono
                            </label>
                            <div className="form__grupo-input">
                                {/* <input
                                    type="number"
                                    className="form__input"
                                    name="telefono"
                                    id="telefono"
                                    placeholder="665842987"
                                /> */}
                                <input
                                    type="number"
                                    className="form__input"
                                    name="telefono"
                                    id="telefono"
                                    placeholder="665842987"
                                    {...register("telephone", {
                                        required: true,
                                        pattern: /^\d{9}$/i,
                                    })}
                                    onChange={handleInputChange}
                                />
                                {errors?.telephone?.type === "pattern" && <p>Debe de haber 9 dígitos</p>}
                                <img className="form__validacion-estado" alt="Validación de estado" />
                            </div>
                            {/* <p className="form__input-error">Debe haber 9 dígitos</p> */}
                        </div>
                        {/* Email */}
                        <div className="form__grupo" id="grupo__email">
                            <label htmlFor="email" className="form__label">
                                Email
                            </label>
                            <div className="form__grupo-input">
                                {/* <input
                                    type="email"
                                    className="form__input"
                                    name="email"
                                    id="email"
                                    placeholder="felipe@gma.com"
                                /> */}
                                <input
                                    type="email"
                                    className="form__input"
                                    name="email"
                                    id="email"
                                    placeholder="felipe@gma.com"
                                    {...register("email", {
                                        required: true,
                                        pattern:
                                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                                    })}
                                    onChange={handleInputChange}
                                />
                                {errors?.email?.type === "pattern" && <p>Completa el email</p>}
                                <img className="form__validacion-estado" alt="Validación de estado" />
                            </div>
                            {/* <p className="form__input-error">Completa el email</p> */}
                        </div>
                        {/* Comentarios */}
                        <div className="comentario__texto">
                            <label htmlFor="comentario">Comentarios</label>
                            {/* aja  rows="3" cols="65"  */}
                            <textarea onChange={handleInputChange} name="comentarios"></textarea>
                        </div>
                        {/* Términos */}
                        <div className="" id="grupo__terminos">
                            <label className="">
                                <p>
                                    <input
                                        type="checkbox"
                                        className="cajaBox form__checkbox"
                                        name="terminos"
                                        id="terminos"
                                        {...register('terminos')}  //  saber valor del checkbox de acepto condiciones
                                    />
                                    Acepto la{' '}
                                    <span style={{ color: 'blue' }}>política de privacidad</span> y el
                                    envío de comunicaciones informativas
                                </p>
                            </label>
                        </div>
                        {/* extra aja:  saber valor del checkbox de acepto condiciones */}
                        {/* usar la variable "aceptoTerminos" para verificar si el checkbox está marcado */}
                        {/* {aceptoTerminos ? "" : <p>-----El checkbox no está marcado. Debes aceptar las condiciones.</p>} */}
                        {!aceptoTerminos ? <p style={{ color: "red", textAlign: "center" }}>El checkbox no está marcado. Debes aceptar las condiciones.</p> : ""}
                        <button className="boton__enviar__formulario" /*onClick={onSubmit}*/ 
                                style={{ backgroundColor: aceptoTerminos ? '' : 'gray' }}
                                disabled={!aceptoTerminos}>Guardar datos</button> 
                                                                                            {/* Deshabilita el botón si no se aceptan los términos */}
                    </form>
                </div>
            </section>

            {/* <!--FORMULARIO TARJETA DE PAGO--> */}
            <section className="contenedor-form-tarjeta">
                <div className="contenedor__form__tarjeta">
                    <div className="contenedor__form__cabeza__tarjeta">
                        <h2>Forma de pago</h2>
                    </div>
                    <form action="" className="formulario" id="formulario">
                        {/* <!--Nombre del titular de la tarjeta --> */}
                        <div className="formulario__grupo" id="grupo__nombreTarjeta">
                            <label for="nombreTarjeta" className="formulario__label">Nombre del titular de la tarjeta <span style={{ color: 'red' }}>*</span></label>
                            <div className="formulario__grupo-input">
                                <input type="text" className="formulario__input" name="nombreTarjeta" id="nombreTarjeta" placeholder="Felipe Garcia Lorca"
                                    {...register("nameCardHolder", {
                                        required: true,
                                        pattern: /^[A-Za-z]+$/i,
                                    })}
                                />
                                {errors?.nameCardHolder?.type === "required" && <p>El nombre de la tarjeta no puede estar vacio</p>}
                               
                                {/* input validador de STRIPE */}
                                <Elements stripe={stripePromise}>
                                    {/* aja: margin-left: initial; para alinear el input <CardElement /> al input del Nombre del titular de la tarjeta */}
                                    <div className="container p-4" style={{ marginLeft: 'initial' }}>
                                        <div className="row h-100">
                                            <div className="col-md-4 offset-md-4 h-100">
                                                <CheckoutForm />
                                            </div>
                                        </div>
                                    </div>
                                </Elements>
                            </div>
                            {/* <p className="formulario__input-error">El nombre de la tarjeta no puede estar vacio</p> */}

                        </div>





                        {/* <section class="contenedor-form"/>
                <div class="contenedor__form">
                    <div class="contenedor__form__cabeza">
                        <h2>Datos del conductor principal</h2>
                    </div>
                    <form action="" id="form" class="form">
                        {/* <!-- Nombre --> *
                        <div class="form__grupo" id="grupo__nombre">
                            <label for="nombre" class="form__label">Nombre</label>
                            <div class="form__grupo-input">
                                <input type="text" class="form__input" name="nombre" id="nombre" placeholder="felipe" />
                                <img  class="form__validacion-estado"/>
                            </div>
                            <p class="form__input-error">El nombre no puede estar vacio</p>
                        </div>
                        {/* <!-- Apellidos --> *
                        <div class="form__grupo" id="grupo__apellidos">
                            <label for="apellido" class="form__label">Apellidos</label>
                            <div class="form__grupo-input">
                                <input type="text" class="form__input" name="apellidos" id="apellidos" placeholder="garcia lorca"/>
                                <img  class="form__validacion-estado"/>
                            </div>
                            <p class="form__input-error">Deben ser dos apellidos</p>
                        </div>
                        {/* <!-- DNI --> *
                        <div class="form__grupo" id="grupo__dni">
                            <label for="dni" class="form__label">DNI</label>
                            <div class="form__grupo-input">
                                <input type="text" class="form__input" name="dni" id="dni" placeholder="46361585W"/>
                                <img  class="form__validacion-estado"/>
                            </div>
                            <p class="form__input-error">Completa el DNI y no pongas - </p>
                        </div>
                        {/* <!-- Teléfono --> *
                        <div class="form__grupo" id="grupo__telefono">
                            <label for="telefono" class="form__label">Teléfono</label>
                            <div class="form__grupo-input">
                                <input type="number" class="form__input" name="telefono" id="telefono" placeholder="665842987"/>
                                <img  class="form__validacion-estado"/>
                            </div>
                            <p class="form__input-error">Debe de haber 9 dígitos</p>
                        </div>
                        {/* <!-- Email --> *
                        <div class="form__grupo" id="grupo__email">
                            <label for="email" class="form__label">Email</label>
                            <div class="form__grupo-input">
                                <input type="email" class="form__input" name="email" id="email" placeholder="felipe@gma.com"/>
                                <img  class="form__validacion-estado"/>
                            </div>
                            <p class="form__input-error">Completa el email</p>
                        </div>
                        {/* <!-- Comentarios --> *
                        <div class="comentario__texto">
                            <label for="comentario">Comentarios</label>
                            <textarea ></textarea>
                        </div>
                        {/* <!-- terminos --> *
                        <div class="" id="grupo__terminos">
                            <label class="">
                                <p><input type="checkbox" class="cajaBox form__checkbox" name="terminos" id="terminos"/>Acepto la <span style="color: blue;">política de privacidad</span> y el envío de comunicaciones informativas</p>
                            </label>
                        </div>
                        <button class="boton__enviar__formulario">Guardar datos</button>
                    </form>
                </div>
            </section> */}

                        {/* // funciona ok */}
                        {/* <form action="" className="formulario" id="formulario"> */}
                        <section className="contenedor__desglose">
                            <div className="contenedor__desglose__precioCoche">
                                <h3 className="contenedor__desglose__precioCoche-parrafo">Desglose del precio del coche</h3>
                            </div>
                        </section>
                        <section className="contenedor__desglose__total">
                            <div className="contenedor__desglose__total__precio">
                                <div className="contenedor__desglose__total__precio-parrafo">Precio del alquiler</div>
                                <div className="contenedor__desglose__total__precio-parrafo">{precioAlquilerCalculado}€</div>
                            </div>
                        </section>
                        <section className="contenedor__desglose__total__final">
                            <div className="contenedor__desglose__total__final__precio">
                                <div className="contenedor__desglose__total__final__precio-parrafoDia">Precio por <span>1</span> día:</div>
                                <div className="contenedor__desglose__total__final__precio-parrafo"><span>{precio}</span>€</div>
                            </div>
                        </section>
                        {/* <!--Términos y condiciones--> */}
                        <section className="contenedor__terminos">
                            <div className="contenedor__terminos__condiciones">
                                <div className="contenedor__terminos__condiciones__cabeza">
                                    <h2>Términos y condiciones</h2>
                                    <div>
                                        <p className="contenedor__terminos__condiciones-p">Al hacer clic en "Reservar", confirmas que has leído y que comprendes y aceptas nuestros <span style={{ color: 'blue' }} >Términos generales</span>, las <span style={{ color: 'blue' }}>Condiciones de la póliza</span> y las <span style={{ color: 'blue;' }}>Condiciones del alquiler de e-Fast</span>.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* <!--Boton Reservar--> */}
                        <section className="contenedor__boton__reserva">
                            <div className="contenedor__boton__reserva__final">
                                <a href="" className="contenedor__boton">
                                    {/* <!-- link--> */}
                                    <button type="submit" /*formaction="teslaReservaFinalizada.html"*/ className="contenedor__boton-forma">Confirmar pago</button>
                                </a>
                            </div>
                        </section>

                    </form>
                </div>
            </section>




            {/* </main> */}
        </>
        /* <!--FORMULARIO TARJETA DE PAGO--> */
        // <section class="contenedor-form-tarjeta">
        //     <div class="contenedor__form__tarjeta">
        //         <div class="contenedor__form__cabeza__tarjeta">
        //             <h2>Forma de pago</h2>
        //         </div>
        //         <form action="" class="formulario" id="formulario">
        //             {/* <!--Nombre del titular de la tarjeta --> */}
        //             <div class="formulario__grupo" id="grupo__nombreTarjeta">
        //                 <label for="nombreTarjeta" class="formulario__label">Nombre del titular de la tarjeta <span style="color: red;">*</span></label>
        //                 <div class="formulario__grupo-input">
        //                     <input type="text" class="formulario__input" name="nombreTarjeta" id="nombreTarjeta" placeholder="Felipe Garcia Lorca">
        //                     <img  class="formulario__validacion-estado">
        //                 </div>
        //                 <p class="formulario__input-error">El nombre de la tarjeta no puede estar vacio</p>
        //             </div>

        //             {/* <!--Número de la tarjeta --> */}
        //             <div class="formulario__grupo" id="grupo__numeroTarjeta">
        //                 <label for="numeroTarjeta" class="formulario__label">Número de la tarjeta <span style="color: red;">*</span></label>
        //                 <div class="formulario__grupo-input">
        //                     <input type="text" class="formulario__input" name="numeroTarjeta" id="numeroTarjeta" placeholder="5458 6359 2586 4236">
        //                     <img  class="formulario__validacion-estado">
        //                 </div>
        //                 <p class="formulario__input-error">Completa el número de tarjeta, utiliza espacios xxxx xxxx xxxx xxxx</p>
        //             </div>

        //             {/* <!--Fecha de caducidad --> */}
        //             <div class="formulario__grupo" id="grupo__fechaCaducidad">
        //                 <label for="fechaCaducidad" class="formulario__label">Fecha de caducidad <span style="color: red;">*</span></label>
        //                 <div class="formulario__grupo-input">
        //                     <input type="text" class="formulario__input" name="fechaCaducidad" id="fechaCaducidad" placeholder="MM / AA">
        //                     <img  class="formulario__validacion-estado">
        //                 </div>
        //                 <p class="formulario__input-error">Completa el número de tarjeta, utiliza barra sin espacio MM/AA</p>
        //             </div>

        //             {/* <!--CVC --> */}
        //             <div class="formulario__grupo" id="grupo__cvc">
        //                 <label for="cvc" class="formulario__label">CVC <span style="color: red;">*</span></label>
        //                 <div class="formulario__grupo-input">
        //                     <input type="number" class="formulario__input" name="cvc" id="cvc" placeholder="123">
        //                     <img  class="formulario__validacion-estado">
        //                 </div>
        //                 <p class="formulario__input-error">Completa el cvc de la tarjeta con 3 dígitos</p>
        //             </div>

        //              {/* <!--Desglose del precio del moto--> */}
        //             <section class="contenedor__desglose">
        //             <div class="contenedor__desglose__precioCoche">
        //                 <h3 class="contenedor__desglose__precioCoche-parrafo">Desglose del precio del coche</h3>
        //             </div> 
        //             </section>
        //             <section class="contenedor__desglose__total">
        //                 <div class="contenedor__desglose__total__precio">
        //                     <div class="contenedor__desglose__total__precio-parrafo">Precio del alquiler</div>
        //                     <div class="contenedor__desglose__total__precio-parrafo">159€</div>
        //                 </div> 
        //             </section>
        //             <section class="contenedor__desglose__total__final">
        //                 <div class="contenedor__desglose__total__final__precio">
        //                     <div class="contenedor__desglose__total__final__precio-parrafoDia">Precio por <span>1</span> día:</div>
        //                     <div class="contenedor__desglose__total__final__precio-parrafo"><span>159</span>€</div>
        //                 </div> 
        //             </section>
        //             {/* <!--Términos y condiciones--> */}
        //             <section class="contenedor__terminos">
        //                 <div class="contenedor__terminos__condiciones">
        //                     <div class="contenedor__terminos__condiciones__cabeza">
        //                         <h2>Términos y condiciones</h2>
        //                         <div>
        //                             <p class="contenedor__terminos__condiciones-p">Al hacer clic en "Reservar", confirmas que has leído y que comprendes y aceptas nuestros <span style="color: blue;">Términos generales</span>, las <span style="color: blue;">Condiciones de la póliza</span> y las <span style="color: blue;">Condiciones del alquiler de e-Fast</span>.</p>
        //                             </div>
        //                     </div>
        //             </section>
        //                 {/* <!--Boton Reservar--> */}
        //             <section class="contenedor__boton__reserva">
        //                 <div class="contenedor__boton__reserva__final">
        //                     <a href="" class="contenedor__boton"><!-- link-->
        //                         <button type="submit" formaction="teslaReservaFinalizada.html" class="contenedor__boton-forma">Confirmar pago</div>
        //                     </a>
        //                 </div>
        //             </section>
        //         </form>
        //     </div>
        // </section>     

        // </main>

    );
};

export default FinalizarReserva;
