// import data from '../../public/data.json';
import React, { useState } from "react";
import { Modal } from "@mui/base";
// import Backdrop from "@mui/material/Backdrop";  // para la modal
// import Fade from "@mui/material/Fade";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// // import TextField from "@mui/material/TextField";
// // import { makeStyles } from '@mui/system';
// // import { useState } from "react";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
import Contactanos from "../../pages/contact-us";

import { useModal } from '../../hooks/modal';

export default function ServicioExclusivoFooter() {

  // aja: CSS a aplicar al Modal de CONTACTANOS OCULTO
  const style = {
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    // width: 400,
    // bgcolor: "background.paper",
    // border: "2px solid #000",
    // boxShadow: 24,
    // p: 4,
    // position: "fixed",
    // position: "absolute",    
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    // // width: 400,
    // // bgcolor: "background.paper",
    // p: 2,
    // // outline: 'none', // Elimina el contorno predeterminado del modal
    // // overflowY: 'auto', // Permite que el modal tenga un desplazamiento interno si es necesario

    // background: "white",   // bgcolor = background-color: white;
    // padding: 0,
    // width: "90%",
    // // top: "400px",
    // top: "2220px",    // fija al altura del Modal. 2220px por default en el original.
    // zIndex: 500,     // = z-index: 500;  superponer el Modal por encima de la web   
    // right: 0,
    // margin: "auto",
    // border: "4px solid #0247FE",
    // display: "block",
    

    position: 'fixed',
        // top: '50%',
        top: "425px",
        left: '50%',
        // left: '0',
        // right: '0',
        transform: 'translate(-50%, -50%)',
        width: '50%', // Ajuste el ancho del modal según sus necesidades .  original: hay una mediaquery para en pantallas pequeñas dejar el width=90%
        '@media (max-width: 1105px)': {         // hasta 1105px que sea este width
            width: '90%',
          },
        //maxWidth: 675, // Máximo ancho del modal  400 .  
        maxHeight: '90%', // Máxima altura del modal
        overflowY: 'auto', // Permite hacer scroll dentro del modal si es necesario
        background: "white",
        p: 2,
        outline: 'none',
        zIndex: 500,
        border: "4px solid #0247FE",
  };

  // const styles=useStyles();

  // no lo uso, pero es el codigo parado a formato React
  const body = (
    // aja original: className="contenedor__contacto__contactanos"
    // className={styles.modal}
    <section style={{ position: 'absolute' }} className="contenedor__contacto__contactanos" id="contactos">
      <section className="contenedor__cerrar">
        <div className="contenedor__cerrar__contacto">
          <div className="contendor__icono">
            <a href="teslaReservar.html" className="contendor__icono__cerrado">
              <img src="/images/iconoCerrar.svg" className="iconoCerrar" />
            </a>
          </div>
        </div>
      </section>

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
        <form action="" id="form" className="form">
          {/* <!-- Nombre --> */}
          <div className="form__grupo" id="grupo__nombre">
            <label htmlFor="nombre" className="form__label">Nombre</label>
            <div className="form__grupo-input">
              <input type="text" className="form__input" name="nombre" id="nombre" placeholder="felipe" />
              <img className="form__validacion-estado" />
            </div>
            <p className="form__input-error">El nombre no puede estar vacio</p>
          </div>
          {/* <!-- Email --> */}
          <div className="form__grupo" id="grupo__email">
            <label htmlFor="email" className="form__label">Email</label>
            <div className="form__grupo-input">
              <input type="email" className="form__input" name="email" id="email" placeholder="felipe@gma.com" />
              <img className="form__validacion-estado" />
            </div>
            <p className="form__input-error">Completa el email</p>
          </div>
          {/* <!-- Teléfono --> */}
          <div className="form__grupo" id="grupo__telefono">
            <label htmlFor="telefono" className="form__label">Teléfono</label>
            <div className="form__grupo-input">
              <input type="number" className="form__input" name="telefono" id="telefono" placeholder="665842987" />
              <img className="form__validacion-estado" />
            </div>
            <p className="form__input-error">Debe de haber 9 dígitos</p>
          </div>
          {/* <!-- Comentarios --> */}
          <div className="comentario__texto">
            <label htmlFor="comentario">Comentarios</label>
            <textarea ></textarea>
          </div>
          {/* <!-- terminos --> */}
          <div className="formulario__grupo-contacto" id="grupo__terminos">
            <label className="formulario__label">
              <p><input type="checkbox" className="cajaBox form__checkbox" name="terminos" id="terminos" />Acepto la <span style={{ color: 'blue' }}>política de privacidad</span> y el envío de comunicaciones informativas</p>
            </label>
          </div>
          <button className="boton__enviar__formulario">ENVIAR</button>
        </form>
      </section>
    </section>
  )

  // Para ambito local solo del CONTACTANOS OCULTO
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  // Para ambito GLOBAL, recuperado desde el contexto <ModalProvider>, que he añadido por encima del <ServicioExclusivoFooter> en App.js
  const { open, handleOpen, handleClose } = useModal();

  return (
    // <>
    

    <section className="contenedor__caja__contactanos">
      <div className="contenedor__caja__parrafo_contactanos">
        <h3 className="elemento-encabezado-cliente">Servicio exclusivo al cliente</h3>
        <button className="boton__contáctanos" onClick={handleOpen}>Contáctanos</button>
        {/* modo Reactjs: useRef={'#contactos'}   , y antes:  href="#contactos" */}
        {/* <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          backdropcomponent={Backdrop}
          backdropprops={{
            timeout: 500,
          }}
          // aja ojo!! 
          //  disableEnforceFocus  // sin esto puesto(por defacult) el modal intentará enfocar automáticamente el primer elemento enfocable dentro de él al abrirse
          disableScrollLock // Evita el bloqueo del desplazamiento del body , hace que MUI  no aplique sus cambios del CSS del body: overflow: hidden;     
       
        >
          <Fade in={open}>
            <Box sx={style}>
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
              {/* aja: elementos de MUI : */}
              {/* <Typography variant="h6" component="h2">
                Text in a modal
              </Typography> */}
              {/* <TextField
              label="Nombre"
              name="nombre"
              value={contactData.nombre}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            *
              {/* <section class="contenedor__contacto__contactanos" id="contactos"> *
                <section className="contenedor__logo" id="pago__realizado">
                  <div className="contenedor__logo__contacto">
                    <div className="">
                      <a href="" className="">
                        <img src="images/logo-empresa.png" className="iconoLogo" />
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
                  <form action="" id="form" className="form">
                    {/* <!-- Nombre --> *
                    <div className="form__grupo" id="grupo__nombre">
                      <label htmlFor="nombre" className="form__label">Nombre</label>
                      <div className="form__grupo-input">
                        <input type="text" className="form__input" name="nombre" id="nombre" placeholder="felipe" />
                        <img className="form__validacion-estado" />
                      </div>
                      <p className="form__input-error">El nombre no puede estar vacio</p>
                    </div>
                    {/* <!-- Email --> *
                    <div className="form__grupo" id="grupo__email">
                      <label htmlFor="email" className="form__label">Email</label>
                      <div className="form__grupo-input">
                        <input type="email" className="form__input" name="email" id="email" placeholder="felipe@gma.com" />
                        <img className="form__validacion-estado" />
                      </div>
                      <p className="form__input-error">Completa el email</p>
                    </div>
                    {/* <!-- Teléfono --> *
                    <div className="form__grupo" id="grupo__telefono">
                      <label htmlFor="telefono" className="form__label">Teléfono</label>
                      <div className="form__grupo-input">
                        <input type="number" className="form__input" name="telefono" id="telefono" placeholder="665842987" />
                        <img className="form__validacion-estado" />
                      </div>
                      <p className="form__input-error">Debe de haber 9 dígitos</p>
                    </div>
                    {/* <!-- Comentarios --> *
                    <div className="comentario__texto">
                      <label htmlFor="comentario">Comentarios</label>
                      <textarea ></textarea>
                    </div>
                    {/* <!-- terminos --> *
                    <div className="formulario__grupo-contacto" id="grupo__terminos">
                      <label className="formulario__label">
                        <p><input type="checkbox" className="cajaBox form__checkbox" name="terminos" id="terminos" />Acepto la <span style={{ color: 'blue' }}>política de privacidad</span> y el envío de comunicaciones informativas</p>
                      </label>
                    </div>
                    <button className="boton__enviar__formulario">ENVIAR</button>
                  </form>
                </section>
              {/* </section> */}
              {/* Otros campos y lógica del formulario */}
              {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography> *
            </Box>
          </Fade>
        </Modal> */}

        {/* se envia el CSS del modal como variable, ya que el CSS PODRÍA cambiar(el top,...) segun si es el modal del Header o de Contactanos Oculto del footer */}
         {/* directamente usar los estados que se pasan desde el useModal() del ModalContext.js */}
        <Contactanos estilo={style} {...{ open, handleOpen, handleClose }}></Contactanos>        
      </div>
      {/* <Modal
        open={modal}
        onClose={abrirCerrarModal} >
        {body}
      </Modal> */}
    </section>

    

  )
}


