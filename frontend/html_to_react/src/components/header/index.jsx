import { useEffect, useState } from "react";

import { useModal } from '../../hooks/modal';

import Contactanos from "../../pages/contact-us";

export default function Header() {  //export para q luego pueda importarse en index

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkResolution = () => {
            setIsDesktop(window.innerWidth > 768);
        }

        window.addEventListener("resize", checkResolution);

        return () => window.removeEventListener("resize", checkResolution);
    }, [])

    // style como el de ServicioExclusivoFooter.jsx
    const style = {
        // position: "absolute",
        // left: "50%",
        // transform: "translate(-50%, -50%)",
        // p: 2,
        // background: "white",   // bgcolor = background-color: white;
        // padding: 0,
        // width: "90%",
        // // top: "400px",
        // top: "596px",    // fija al altura del Modal. 400px por default en el original. valor aja duplicando modales(Header y Contactanos Oculto):1020px
        // zIndex: 500,     // = z-index: 500;  superponer el Modal por encima de la web
        // // left: 0,
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
    }

    const { open, handleOpen, handleClose } = useModal();



    return (

        <header className="header" >{ /*  style={}{ /* { /* <!--nav--> */}
            <nav className="nav container">
                <img src="/images/logo-empresa.png" className="nav_logo" />
                <input type="checkbox" id="check" />
                <label htmlFor="check" className="nav_hamburguer">
                    <img src="/images/icon-hamburger.svg" className="nav_hamburguer" />
                </label>
                <ul className="container__menu__responsive">
                    <li className="container__menu__responsive-item" /*className="container__menu__responsive-item-inicio"*/>
                        <a className="active" href="index.html">Inicio</a>{ /*{ /* <!--esta activo y envia a la página prinicpal (index.html)--> */}
                    </li>
                    <li className="container__menu__responsive-item" >
                        <a className="container__menu__responsive-item-vehiculo" href="#vehiculos">Vehículos</a>
                    </li>
                    <li className="container__menu__responsive-item">
                        {/* <a href="#contactos" className="contactos__solicitado">Contacto</a> */}
                        <a onClick={handleOpen} className="contactos__solicitado">Contacto</a>
                        {/* codigo del modal igual que el de  CONTACTANOS OCULTO=ServicioExclusivoFooter.jsx */}
                        <section className="contenedor__contacto__contactanos" id="contactos">
                            {/* se envia el CSS del modal como variable, ya que el CSS cambia(el top,...) segun si es el modal del Header o de Contactanos Oculto del footer */}
                             {/* directamente usar los estados que se pasan desde el useModal() del ModalContext.js */}
                            <Contactanos estilo={style} {...{open, handleOpen, handleClose}}></Contactanos>
                        </section>

                    </li>
                </ul>
            </nav>
        </header>
    )
}