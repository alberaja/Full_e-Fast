
// aja: Lo uso para hacer Global el Modal de contacto, así este Modal(formulario de contacto) NO es sólo de ambito local para el componente ServicioExclusivoFooter.jsx

import React, { createContext, useContext, useState } from 'react';

// const ModalContext = createContext();

// export const ModalProvider = ({ children }) => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <ModalContext.Provider value={{ open, handleOpen, handleClose }}>
//       {children}
//     </ModalContext.Provider>
//   );
// };

// custom hook
export const useModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return {open, handleOpen, handleClose};
};
