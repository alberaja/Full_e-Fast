import { useState } from 'react';
import './teslaReservar.css';
import { useLocation } from "react-router-dom";

// validar formularios
import { useForm } from "react-hook-form";
import { useStoreVehiculo } from '../../zustand/store';
import Card2 from './../../components/body/card2.jsx'
import { PostData } from './helpers/Postdata.js';
import Swal from 'sweetalert2';
import Payment from './Payment.jsx';

const FinalizarReserva = ({ results }) => {

    // Zustand
    const carData = useStoreVehiculo( state => state.carData );
    //const cardVehicleData = useStoreVehiculo( state => state.cardVehicleData );
    const rentalData = useStoreVehiculo( state => state.rentalData );

    // console.log(results.Cars);  // ver que llega
    const location = useLocation();   // visualizar los estados que llegan en una ruta de react router dom
    console.log(location.state);    //se muestra cada click en guardar datos
  

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

    const [stage , setStage] = useState(0);

    // form submit function which will invoke after successful validation
    // const onSubmit = (data) => {
    //     alert(JSON.stringify(data));
    // };

    // console.log(watch("ejemplo")); // to watch individual input by pass the name of the input
    // watch para obtener el valor actual del checkbox
    const aceptoTerminos = watch('terminos', false);  //o inicializarlo a false. le pongo 5 para no muestre el texto por default

    
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
        //e.preventDefault();
        
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
            const reserva = {precioPorDia: precio, numeroDias: rentalData["numeroDiasReservados"],
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
                 PostData(reserva, conductorFormulario, setStage);
                //setStage(1);
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

    return <>
      {/* <!--Elección--> */}
      {/* <!--Elección--> */}
      <section className="contenedor__eleccion">
        <div className="contenedor__eleccion__tu">
          <h3 className="contenedor__eleccion-parrafo">
            Finalización de la reserva
          </h3>
        </div>
      </section>
      
      {vehiculoElegido}
      {/* <!--contenedor__caja de imagenes Coche--> */}

      {/* Zustand */}
      {/* {"TODO Zustand: "+ JSON.stringify(carData)}   carData.vehiculoId   */}
      {/* {"datosvehiculoElegido " + JSON.stringify(datosvehiculoElegido)} */}
      {/* {"TODO Zustand: "+ JSON.stringify(cardVehicleData)}  */}
      {/* {"Algunos: "+ JSON.stringify(cardVehicleData.vehiculoId) + JSON.stringify(cardVehicleData.vehiculoMarcaModelo)+ ", "+
                        JSON.stringify(cardVehicleData.fechaHoraIni) + JSON.stringify(cardVehicleData.fechaHoraFin)+ ", "+
                        JSON.stringify(cardVehicleData.ciudadesVehiculo) + JSON.stringify(cardVehicleData.ciudadesDevolverVehiculo)+", "+
                        JSON.stringify(cardVehicleData.numeroDiasReservados) + JSON.stringify(cardVehicleData.precioPorDia)+", "+
                        JSON.stringify(cardVehicleData.numPlazas) + JSON.stringify(cardVehicleData.totalReserva) }              */}
      {/* {" , rentalData Zustand: " + JSON.stringify(rentalData)} */}

      {/* <!--FORMULARIO luego de imagen Coche--> */}
      <section
        className="contenedor-form"
        style={{ display: stage === 0 ? "flex" : "none" }}
      >
        <div className="contenedor__form">
          <div className="contenedor__form__cabeza">
            <h2>Datos del conductor principal</h2>
          </div>
          {/* seguir https://codesandbox.io/p/sandbox/form-reservar-wr54px?file=%2Fsrc%2FApp.js%3A22%2C31-22%2C39 */}
          <form
            /*action=""*/ id="form"
            className="form"
            /*onSubmit={handleSubmit(onSubmit)}*/ onSubmit={handleSubmit(
              handleSubmitForm
            )}
          >
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
                <img
                  className="form__validacion-estado"
                  alt="Validación de estado"
                />
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
                {errors?.lastName?.type === "required" && (
                  <p>Introduce tus apellidos</p>
                )}
                {errors?.lastName?.type === "pattern" && (
                  <p>Deben ser dos apellidos</p>
                )}
                <img
                  className="form__validacion-estado"
                  alt="Validación de estado"
                />
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
                {errors?.lastName?.type === "required" && (
                  <p>Introduce tu documento</p>
                )}
                {errors?.dni?.type === "pattern" && (
                  <p>Completa el DNI y no pongas - </p>
                )}
                <img
                  className="form__validacion-estado"
                  alt="Validación de estado"
                />
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
                {errors?.telephone?.type === "pattern" && (
                  <p>Debe de haber 9 dígitos</p>
                )}
                <img
                  className="form__validacion-estado"
                  alt="Validación de estado"
                />
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
                {errors?.email?.type === "pattern" && (
                  <p>Completa el email</p>
                )}
                <img
                  className="form__validacion-estado"
                  alt="Validación de estado"
                />
              </div>
              {/* <p className="form__input-error">Completa el email</p> */}
            </div>
            {/* Comentarios */}
            <div className="comentario__texto">
              <label htmlFor="comentario">Comentarios</label>
              {/* aja  rows="3" cols="65"  */}
              <textarea
                onChange={handleInputChange}
                name="comentarios"
              ></textarea>
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
                    {...register("terminos")} //  saber valor del checkbox de acepto condiciones
                  />
                  Acepto la{" "}
                  <span style={{ color: "blue" }}>
                    política de privacidad
                  </span>{" "}
                  y el envío de comunicaciones informativas
                </p>
              </label>
            </div>
            {/* extra aja:  saber valor del checkbox de acepto condiciones */}
            {/* usar la variable "aceptoTerminos" para verificar si el checkbox está marcado */}
            {/* {aceptoTerminos ? "" : <p>-----El checkbox no está marcado. Debes aceptar las condiciones.</p>} */}
            {!aceptoTerminos ? (
              <p style={{ color: "red", textAlign: "center" }}>
                El checkbox no está marcado. Debes aceptar las condiciones.
              </p>
            ) : (
              ""
            )}
            <button
              className="boton__enviar__formulario" /*onClick={onSubmit}*/
              style={{ backgroundColor: aceptoTerminos ? "" : "gray" }}
              disabled={!aceptoTerminos}
            >
              Guardar datos
            </button>
            {/* Deshabilita el botón si no se aceptan los términos */}
          </form>
        </div>
      </section>

      {/* <!--FORMULARIO TARJETA DE PAGO--> */}
      {/* <StripeForm /> */}         
          <Payment email={formData.email} hidden={stage===0}/>
      

      {/* </main> */}
    </>
    /* <!--FORMULARIO TARJETA DE PAGO--> */;
};

export default FinalizarReserva;
