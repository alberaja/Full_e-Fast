import Modal from "@mui/material/Modal";

import { useModal } from '../../hooks/modal';
import Backdrop from "@mui/material/Backdrop";  // para la modal
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// validar formularios
import { useForm } from "react-hook-form";
import ModalLayout from "../../components/modal-layout";

export default function Contactanos({ estilo , open, handleOpen, handleClose}) {

    // Form modal contactanos
    // const { open, handleOpen, handleClose } = useModal();

    // validacion del form modal
    const {
        register,
        handleSubmit,
        watch,   // saber valor del checkbox de acepto condiciones     
        formState: { errors },
    } = useForm();

    // form submit function which will invoke after successful validation
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    return (

        <ModalLayout isOpen={open} handleClose={handleClose}>
               {/* todo lo de dentro de ModalLayout es el children, es 1 prop más */}
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        sx={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* <section class="contenedor__contacto__contactanos" id="contactos"> */}
                    <section className="contenedor__logo" id="pago__realizado">
                        <div className="contenedor__logo__contacto">
                            <div className="">
                                <a href="" className="">
                                    <img src="/images/logo-empresa.png" className="iconoLogo" />
                                </a>
                            </div>
                        </div>
                    </section>

                    <section className="reserva__realizada">
                        <div className="reserva__realizada__correctamente">
                            <h2 className="reserva__realizada__correctamente-p">Déjanos tus datos y contactaremos contigo lo antes posible.</h2>
                        </div>

                    </section>

                    <section className="contenedor__form1">
                        {/* Para la validacion de los campos: onSubmit={handleSubmit(onSubmit)}  */}
                        <form action="" id="form" className="form" onSubmit={handleSubmit(onSubmit)}>
                            {/* <!-- Nombre --> */}
                            <div className="form__grupo" id="grupo__nombre">
                                <label htmlFor="nombre" className="form__label">Nombre</label>
                                <div className="form__grupo-input">
                                    <input type="text" className="form__input" name="nombre" id="nombre" placeholder="felipe"
                                        // validacion
                                        {...register("firstName", {
                                            required: true,
                                            maxLength: 40,
                                            pattern: /^[A-Za-z]+$/i,
                                        })}
                                    />
                                    {errors?.firstName?.type === "required" && (
                                        <p>El nombre no puede estar vacio</p>
                                    )}
                                    {errors?.firstName?.type === "maxLength" && (
                                        <p>Nombre hasta 40 carácteres</p>
                                    )}
                                    {errors?.firstName?.type === "pattern" && (
                                        <p>Caracteres alfabéticos sólo</p>
                                    )}
                                    <img className="form__validacion-estado" />
                                </div>
                                <p className="form__input-error">El nombre no puede estar vacio</p>
                            </div>
                            {/* <!-- Email --> */}
                            <div className="form__grupo" id="grupo__email">
                                <label htmlFor="email" className="form__label">Email</label>
                                <div className="form__grupo-input">
                                    <input type="email" className="form__input" name="email" id="email" placeholder="felipe@gma.com"
                                        // validacion
                                        {...register("email", {
                                            required: true,
                                            pattern:
                                                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                                        })}
                                    />
                                    {errors?.email?.type === "pattern" && <p>Completa el email</p>}
                                    <img className="form__validacion-estado" />
                                </div>
                                <p className="form__input-error">Completa el email</p>
                            </div>
                            {/* <!-- Teléfono --> */}
                            <div className="form__grupo" id="grupo__telefono">
                                <label htmlFor="telefono" className="form__label">Teléfono</label>
                                <div className="form__grupo-input">
                                    <input type="number" className="form__input" name="telefono" id="telefono" placeholder="665842987"
                                        // validacion
                                        {...register("telephone", {
                                            required: true,
                                            pattern: /^\d{9}$/i,
                                        })}
                                    />
                                    {errors?.telephone?.type === "pattern" && <p>Debe de haber 9 dígitos</p>}
                                    <img className="form__validacion-estado" />
                                </div>
                                <p className="form__input-error">Debe de haber 9 dígitos</p>
                            </div>
                            {/* <!-- Comentarios --> */}
                            <div className="comentario__texto">
                                <label htmlFor="comentario">Comentarios</label>
                                {/* registrarlo solo cuando el contenido del textarea no sea vacío */}
                                <textarea   maxLength="400"                                
                                {...register('comentarios', {
                                    validate: (value) => value.length <= '400',
                                  })}  ></textarea>
                            </div>
                            {/* <!-- terminos --> */}
                            <div className="formulario__grupo-contacto" id="grupo__terminos">
                                <label className="formulario__label">
                                    <p><input type="checkbox" className="cajaBox form__checkbox" name="terminos" id="terminos"
                                        {...register('terminos')}  //  saber valor del checkbox de acepto condiciones
                                    />
                                        Acepto la{' '}
                                        <span style={{ color: 'blue' }}>política de privacidad</span> y el
                                        envío de comunicaciones informativas</p>
                                </label>
                            </div>
                            <button className="boton__enviar__formulario">ENVIAR</button>
                        </form>
                    </section>
                    {/* </section> */}
                    {/* Otros campos y lógica del formulario */}
       
        </ModalLayout>
    )


}