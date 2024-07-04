import Card from './Card';
import { transformdata } from './transformData'
import Paginador from './Paginador';
import { useLocation } from 'react-router-dom';

const SearchResultsCarsEFast = ({ results , numDiasRangoEntreFechas}) => {

    // ver que llega
    // console.log(results.Cars);
    let diasReservados = numDiasRangoEntreFechas;//= 5;
    //sessionStorage.getItem('diasReservados') ?? new Date();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    // Verifica si los parámetros tienen valor
    const isFechaHoraFinValid = queryParams.get('fechaHoraFin');
    const isFechaHoraIniValid = queryParams.get('fechaHoraIni');
    const isCiudadesVehiculo = queryParams.get('ciudadesVehiculo');

    // Si alguno de los parámetros no tiene valor, deshabilita el link    
    //const isDisabled=true;//ok SOLO TESTING
    const isDisabled= (!isFechaHoraFinValid || !isFechaHoraIniValid || !isCiudadesVehiculo) ?true:false;
    return (        

        //  Cards
        // <!--Listado de vehiculos, ej: Coche Tesla-->
        <main>
            
            <div className=" px-5 py-24 mx-auto  flex flex-col gap-6" >
           
                { queryParams.get('ciudadesVehiculo') && queryParams.get('ciudadesDevolverVehiculo') !== null && queryParams.get('ciudadesDevolverVehiculo') !== queryParams.get('ciudadesVehiculo') ?  <p className='flex justify-center'>Oficina de recogida: { queryParams.get('ciudadesVehiculo')}</p> : ""}
                { queryParams.get('ciudadesDevolverVehiculo')==null && queryParams.get('ciudadesVehiculo') ?  <p className='flex justify-center'>Oficina de recogida y devolución: { queryParams.get('ciudadesVehiculo')}</p> : ""}
                { queryParams.get('ciudadesDevolverVehiculo') && queryParams.get('ciudadesVehiculo') && (queryParams.get('ciudadesDevolverVehiculo') === queryParams.get('ciudadesVehiculo') )  ?  <p className='flex justify-center'>Oficina de recogida y devolución: { queryParams.get('ciudadesDevolverVehiculo')}</p> : ""}
                { queryParams.get('ciudadesDevolverVehiculo') && queryParams.get('ciudadesDevolverVehiculo') !== queryParams.get('ciudadesVehiculo')  ?  <p className='flex justify-center'>Oficina de devolución: { queryParams.get('ciudadesDevolverVehiculo')}</p> : ""}
                <p className='flex justify-center' style={{ fontSize: '1.25rem' }}>Resultados para esas fechas y filtros seleccionados: {results.totalHits} </p>                
                <Paginador results={results}></Paginador>
                    {results && results.vehiculos?.map((coche) => {
                        const props = transformdata(coche)
                        const urlVar = { pathname: '/vehiculoElegido/'+coche.id, state: { diasReservados /*, coche: coche.car_model, price: coche.price*/ } }
                        //const linkProps = {diasReservados}
                        return <Card {...props } isDisabled={isDisabled} numCiudadesVehicl={coche.ciudades_vehiculo} url={urlVar} idCar={coche.id}/*diasReservados={diasReservados}*/ />
                    })
                    }                
                <Paginador results={results}></Paginador>
            </div>           

            {/* <!--contenedor__caja de imagenes Coche-->  */}
        </main>

    );
};

export default SearchResultsCarsEFast;
