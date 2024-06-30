import { Backdrop, Box, Fade, Modal } from '@mui/material'
import React from 'react'


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
        top: "595px", // ok "425px",
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

  // Modal reusable que pinta todo el contenido que tiene la prop del children
const ModalLayout = ({isOpen, handleClose, children}) => {
  return (
    <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            //backdropcomponent={Backdrop}  //fondo oscuro
            backdropprops={{
                timeout: 500,
            }}
            // aja ojo!! 
            //  disableEnforceFocus  // sin esto puesto(por defacult) el modal intentará enfocar automáticamente el primer elemento enfocable dentro de él al abrirse
            disableScrollLock // Evita el bloqueo del desplazamiento del body , hace que MUI  no aplique sus cambios del CSS del body: overflow: hidden;     

        >   
            {/* <Fade in={isOpen}> */}
                {/* sx={style} */}
                <Box sx={style}>                  
                    {children}
                    {/* Otros campos y lógica del formulario */}
                </Box>
            {/* </Fade> */}
        </Modal>
  )
}

export default ModalLayout