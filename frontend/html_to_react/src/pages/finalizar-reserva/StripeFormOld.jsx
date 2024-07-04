import { useForm } from "react-hook-form";

// para STRIPE
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements
} from "@stripe/react-stripe-js";
import CheckoutForm from './checkoutform';
import { useStoreVehiculo } from "../../zustand/store";


function StripeForm() {

  const {
    register,
    handleSubmit,
    watch,   // saber valor del checkbox de acepto condiciones     
    formState: { errors },
} = useForm();

 // para STRIPE
 const stripePromise = loadStripe("pk_test_51OLugQACmPQ0R4zJmCHu91pqTI1MzU23TskkU7Bn7fmiK5onZbnRhbSXgE32rJm2rL5wy3DMYJIEHYfLIlhau0gA000m3ggUpz");

 const rentalData = useStoreVehiculo( state => state.rentalData );
 let precioAlquilerCalculado = rentalData.totalReserva;

 const datosvehiculoElegido = useStoreVehiculo(state => state.cocheReserva);

 const hasSpecialOffer = datosvehiculoElegido?.precio[0].ofertaEspecial === true;
 const precio = hasSpecialOffer ? datosvehiculoElegido?.precio[0].precioOferta : datosvehiculoElegido?.precio[0].por1DiaEuros;

  return (
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
                                    {...register("nombreTarjeta", {
                                        required: true,
                                        pattern: /^[A-Za-z]+$/i,
                                    })}
                                />
                                {errors?.nombreTarjeta?.type === "required" && <p>El nombre de la tarjeta no puede estar vacio</p>}
                               
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
  );
}

export default StripeForm;
