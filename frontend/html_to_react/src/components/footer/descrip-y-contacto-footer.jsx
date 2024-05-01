// import data from '../../public/data.json';

export default function DescripyContactoFooter() {
  return (
    // <>

    <section className="contenedor__contacto__conocernos" >
      <div className="contenedor__contacto__conocernos__grid">
        <div className="contenedor__contacto__conocernos__logotipo">
          <img src="images/logo-empresa2.png" className="nav_logo" />
        </div>
        <div className="contenedor__contacto__conocernos__texto">
          <div className="contenedor__texto">
            <p>En e-fast somos especialistas en alquiler de vehículos eléctricos. Descubre la comodidad y rapidez que ofrecemos a nuestros clientes.
              Ven a conocernos y disfruta de nuestra gama de vehículos eléctricos.
            </p>
          </div>
        </div>
        <div className="contenedor__redesSociales">
          <div className="contenedor__redesSociales__instagramFacebook">
            <img src="images/instagram.svg" className="icono_instagram" />
            <img src="images/facebook.svg" className="icono_facebook" />
          </div>
        </div>
      </div>

      { /* <!--Descripción y Contacto--> */}
      <div className="contenedor__contacto__conocernos__grid-sitio">
        <div className="contenedor__contacto__conocernos__sitio">
          <h2 className="conocernos__sitio"> Ven a conocernos en: </h2>
        </div>
        <div className="contenedor__contacto__conocernos__sitio__especifico">
          <p className="conocernos__sitio__especifico">Av. de Sarrià, 150<br />08017 Barcelona</p>
        </div>

      </div>
      <div className="contenedor__telefono__contacto">
        <h2 className="contenedor__telefono__contacto__especifico">Teléfono de contacto:</h2>
      </div>
      <div className="contenedor__telefono__contacto__numero">
        <p className="contenedor__telefono__contacto__numero__especifico">664155888</p>
      </div>

      <div className="contenedor__comercial">
        <h2 className="contenedor__comercial__especifico">Horario comercial:</h2>
      </div>
      <div className="contenedor__comercial__horario">
        <p className="contenedor__comercial__horario__especifico" >L-V: 09:00 – 14:00 y 16:00 – 20:00<br />S: 10:00 a 13:00<br />D: cerrado</p>
      </div>
    </section>



  )
}


