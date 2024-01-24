// import data from '../../public/data.json';

export default function ContactanosOcultoFooter() {
  return (
    // <>

    <section className="contenedor__contacto__contactanos" id="contactos">
      <section className="contenedor__cerrar">
        <div className="contenedor__cerrar__contacto">
          <div className="contendor__icono">
            <a href="index.html" className="contendor__icono__cerrado">
              <img src="images/iconoCerrar.svg" className="iconoCerrar" />
            </a>
          </div>
        </div>
      </section>

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


      <section className="contenedor__form">
        <form action="" id="form" className="form">

          <div className="form__grupo" id="grupo__nombre">
            <label htmlFor="nombre" className="form__label">
              Nombre
            </label>
            <div className="form__grupo-input">
              <input
                type="text"
                className="form__input"
                name="nombre"
                id="nombre"
                placeholder="felipe"
              />
              <img className="form__validacion-estado" />
            </div>
            <p className="form__input-error">El nombre no puede estar vacio</p>
          </div>

          <div className="form__grupo" id="grupo__email">
            <label htmlFor="email" className="form__label">
              Email
            </label>
            <div className="form__grupo-input">
              <input
                type="email"
                className="form__input"
                name="email"
                id="email"
                placeholder="felipe@gma.com"
              />
              <img className="form__validacion-estado" />
            </div>
            <p className="form__input-error">Completa el email</p>
          </div>

          <div className="form__grupo" id="grupo__telefono">
            <label htmlFor="telefono" className="form__label">
              Teléfono
            </label>
            <div className="form__grupo-input">
              <input
                type="number"
                className="form__input"
                name="telefono"
                id="telefono"
                placeholder={"665842987"}
              />
              <img className="form__validacion-estado" />
            </div>
            <p className="form__input-error">Debe de haber 9 dígitos</p>
          </div>

          <div className="comentario__texto">
            <label htmlFor="comentario">Comentarios</label>
            <textarea defaultValue={""} />
          </div>

          <div className="formulario__grupo" id="grupo__terminos">
            <label className="formulario__label">
              <p>
                <input
                  type="checkbox"
                  className="cajaBox form__checkbox"
                  name="terminos"
                  id="terminos"
                />
                Acepto la{" "}
                <span style={{ color: "blue" }}>política de privacidad</span> y el
                envío de comunicaciones informativas
              </p>
            </label>
          </div>
          <button className="boton__enviar__formulario">ENVIAR</button>
        </form>
      </section>

    </section>



  )
}


