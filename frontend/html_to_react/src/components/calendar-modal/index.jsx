import { useRef } from "react";

export default function CalendarModal() {
  const calendar = useRef();

  return (
    <div className="contenedor_calendar">
      {/* <!--calendario-------------------> */} 
      <section className="calendar" ref={calendar} id="calendar__link">

        <div className="selected-date"></div>

        <a href="#calendar__link-cerrar" className="calendar__iconosCalendario-cerrar">{ /* <!--link--> */}
          <img src="images/iconoCerrar.svg" className="cruz__cerrar-icono" />
        </a>

        <div className="calendar__info">{ /* <!--incluye las dos flechas para mover hacia adelante o hacia atrás, y su mes y año en el calendario--> */}
          <div className="calendar__prev" id="prev-month">&#9664;</div>{ /* <!--flecha unicode--> */}
          <div className="calendar__month" id="month"></div>
          <div className="calendar__year" id="year"></div>
          <div className="calendar__next" id="next-month">&#9654;</div>{ /* <!--flecha unicode--> */}
        </div>

        <div className="calendar__week">{ /* <!--calendario de la semana--> */}
          <div className="calendar__day calendar__item">Lun</div>
          <div className="calendar__day calendar__item">Mar</div>
          <div className="calendar__day calendar__item">Mie</div>
          <div className="calendar__day calendar__item">Jue</div>
          <div className="calendar__day calendar__item">Vie</div>
          <div className="calendar__day calendar__item">Sáb</div>
          <div className="calendar__day calendar__item">Dom</div>
        </div>

        <div className="calendar__dates" id="dates">{ /* <!--Se escriben todos los días de la semana. Función writeMonth--> */}
          <button className="calendar__boton">Selecciona Fecha</button>
          <br />
          <button className="calendar__boton-cancelar">Cancelar</button>
        </div>
      </section>
    </div>
  )
}