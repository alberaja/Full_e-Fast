import './teslaReservaFinalizada.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { PostdataReservaFinalizada } from './helpers/PostdataReservaFinalizada';
import { useSearchParams } from 'react-router-dom';

const ReservaFinalizada = ({  }) => {
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(location.search);
  const email = params.get('email');

  //console.log(searchParams.get("email"))
  PostdataReservaFinalizada(email);
  
  return (
    <>   
      <section className="contenedor__caja__pago" id="pago__realizado">
        <div className="contenedor__caja__pago__realizado">
          <div className="pago__realizado__tesla">
            <a className="pago__realizado__tesla__imagen">
              <img src="images/Pago-realizado.png" className="imagenCoche" alt="Pago realizado"/>
            </a>
          </div>
        </div>
      </section>
      <section className="reserva__realizada">
        <div className="reserva__realizada__correctamente">
          <h3 className="reserva__realizada__correctamente-p">
            Su reserva se ha realizado correctamente, recibiras un correo con la confirmación.
            <br />
            Muchas gracias por su reserva.
          </h3>
        </div>     
      </section>
    </>
  );
};

export default ReservaFinalizada;
