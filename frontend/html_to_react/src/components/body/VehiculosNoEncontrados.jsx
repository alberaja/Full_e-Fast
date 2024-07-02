import { useSearchParams } from "react-router-dom";

export default function VehiculosNoEncontrados({results}){

    // Paginador de resultados
    let [searchParams, setSearchParams] = useSearchParams();
    const onChangePage = (e, page) =>{
        const newParams=new URLSearchParams(searchParams)
        newParams.set('page',page)
        setSearchParams(newParams)
        // const queryString = location.search;
        // const params = URLSearchParams(queryString)
                
    }
    const pagina = parseInt(searchParams.get("page") ?? "1")

    return(
        <section className="contenedor__caja__vehiculos__Zero" id="vehiculos">
          <div className="contenedor__caja__vehiculos__dinamico__Zero">
            <div className="caja__zero">
              <a href="" className="caja__zero__imagen">
                {/* <img src="/images/Zero-SRF-360-9.png" className="imagenCoche" /> */}
                {/* <CarIcon className="mx-auto h-12 w-12 text-gray-500 dark:text-gray-400" /> */}
                {/* margin=mt=ml: se suma de 4 en 4 */}
                <CarIcon className="mt-20 ml-28 h-24 w-24 text-gray-500 dark:text-gray-400" />
              </a>
            </div>
          </div>
          <section className="producto__zero">
            <div className="producto__zero__parrafo">
              {/* <h1 className="producto__zero__parrafo">Zero SR/F</h1> */}
              <h2 className="text-2xl font-bold text-center mt-4">Vehículos no encontrados</h2>
            </div>
            <section className="producto__zero__caracteristicas">
              {/* <div className="producto__tesla__parrafo__caracteristicas">
                <div className="producto__zero__parrafo__velocidadPunta">
                  <p className="producto__zero__parrafo__velocidadPunta-p">
                    <img src="/images/velocimetro.png" /> 200km/h
                  </p>
                </div>
                <div className="producto__zero__parrafo__tiempo__carga">
                  <p className="producto__zero__parrafo__tiempo__carga-p">
                    <img src="/images/grid_iconoReloj7.svg" /> 2.4h cargarla
                  </p>
                </div>
                <div className="producto__zero__parrafo__autonomia">
                  <p className="producto__zero__parrafo__autonomia-p">
                    <img src="/images/bateria.svg" /> 272km autonomía
                  </p>
                </div>
              </div> */}
              <p className="text-gray-500 text-center mt-2">
                Lo sentimos, no pudimos encontrar ningún vehículo que coincida con tu búsqueda.
                Pulsa INICIO para comenzar la búsqueda de nuevo.
              </p>
            </section>
          </section>
          <section className="barra__zero">
            {/* <div className="barra__zero__precio">
              <div className="barra__zero__precio__dia">
                <p className="precio__dia">Precio por 1 día</p>
                <h3 className="precio__dia__zero-especifico">79€</h3>
                <img className="iconoCheck" src="images/check.svg" />
                <p className="barra__precio-Cancelacion__gratuita">
                  Cancelación gratuita
                </p>
              </div>
            </div>
            <a href="zeroElegido.html" className="barra__oferta__zero">
              <div>Ver oferta</div>
            </a> */}
          </section>
        </section>
    );
}

function CarIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="44" //24
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    )
  }