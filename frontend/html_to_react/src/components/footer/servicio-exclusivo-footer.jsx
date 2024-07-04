import Contactanos from "../../pages/contact-us";

import { useModal } from '../../hooks/modal';

export default function ServicioExclusivoFooter() {

  // aja: CSS a aplicar al Modal de CONTACTANOS OCULTO
  const style = {   
    

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

  // Para ambito local solo del CONTACTANOS OCULTO
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  // Para ambito GLOBAL, recuperado desde el contexto <ModalProvider>, que he añadido por encima del <ServicioExclusivoFooter> en App.js
  const { open, handleOpen, handleClose } = useModal();

  return (
  
    <section className="contenedor__caja__contactanos">
      <div className="contenedor__caja__parrafo_contactanos">
        <h3 className="elemento-encabezado-cliente">Servicio exclusivo al cliente</h3>
        <button className="boton__contáctanos" onClick={handleOpen}>Contáctanos</button>
        {/* modo Reactjs: useRef={'#contactos'}   , y antes:  href="#contactos" */}
        

        {/* se envia el CSS del modal como variable, ya que el CSS PODRÍA cambiar(el top,...) segun si es el modal del Header o de Contactanos Oculto del footer */}
         {/* directamente usar los estados que se pasan desde el useModal() del ModalContext.js */}
        <Contactanos estilo={style} {...{ open, handleOpen, handleClose }}></Contactanos>        
      </div>
      
    </section>   

  )
}


