import { useEffect } from "react";
import * as Icons from "./Icons";
import { useStoreVehiculo } from "../../zustand/store";
// import PropTypes from 'prop-types'


// iconos
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BatteryChargingFullRoundedIcon from "@mui/icons-material/BatteryChargingFullRounded";
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import { useNavigate } from "react-router-dom";

const IconSide = [
  { icon: "Information", value: 0 },
  { icon: "Car", value: 1 },
  { icon: "Engine", value: 2 },
];

export default function Card2 ( coche  ) {
  
  //const {carData} = useStoreVehiculo();
  //let numdiasReservados = carData.numeroDiasReservados ?? 0;

  // redireccion si el obj de esta vacío
  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
  
  const rentalData = useStoreVehiculo( state => state.rentalData );
  // console.log("resultado: ", coche);
  //control de buscar 1 id e vehiculo q no responde vehiculos
      //if(coche) return //control error
      //if(isObjectEmpty(coche)) navigate('/'); //return 
  let navigate = useNavigate()  
  useEffect(() => {    
    //console.log("cocheeeeeeee", coche)
    if (isObjectEmpty(coche) 
          || isObjectEmpty(rentalData.ciudadesVehiculo) 
          || isObjectEmpty(rentalData.fechaHoraIni)
          || isObjectEmpty(rentalData.fechaHoraFin) 
        ) {
      navigate('/');
    }
  }, [coche, ]);
 

  const datosvehiculoElegido = useStoreVehiculo(state => state.cocheReserva)
    console.log("datosvehiculoElegido-->", datosvehiculoElegido)
    const hasSpecialOffer = datosvehiculoElegido?.precio[0].ofertaEspecial === true;
    const precio = hasSpecialOffer ? datosvehiculoElegido?.precio[0].precioOferta : datosvehiculoElegido?.precio[0].por1DiaEuros;

  // Precio por 1 día
      // const hasSpecialOffer = coche?.precio[0].ofertaEspecial === true;
      // const precio = hasSpecialOffer ? coche?.precio[0].precioOferta : coche?.precio[0].por1DiaEuros;
  //const cardVehicleData = useStoreVehiculo( state => state.cardVehicleData );
  

    const iconEngines = {
        BEV: { icon: Icons.Electric, text: "100% Eléctrico", value: "BEV" },
        HEV: { icon: Icons.Fuel, text: "Híbrido no enchufable", value: "HEV" },
        MHEV: { icon: Icons.Fuel, text: "Hibrido ligero", value: "MHEV" },
        PHEV: { icon: Icons.FuelElectric, text: "Híbrido Enchufable", value: "PHEV" },  // text es el tooltip=hover
        SHEV: { icon: Icons.Fuel, text: "Híbrido Puro", value: "SHEV" },
    } 
        const tipo= !isObjectEmpty(coche) ? coche?.caracteristicas[0]?.tipoVehiculo : "BEV"
        const { icon : Icon, text } = iconEngines[tipo] ?? {icon:null,text:""}

    
  return (    
    ( !isObjectEmpty(coche) ?  
    <main>
      {/* Solo se recibe 1 vehiculo aqui */}
      <section
        key={coche.id}
        className="contenedor__caja__vehiculos__tesla"
        id="vehiculos"
      >
        <div className="contenedor__caja__vehiculos__dinamico__tesla">
          <div className="caja__tesla">
            <a href="" className="caja__tesla__imagen">
              {/*<img src="/images/tesla3.png" className="imagenCoche" />*/}
              {/* <img src={coche.imagen_url} className="imagenCoche" /> */}
              <img src={`/images/card2/${coche.imagen_url}`} className="imagenCoche" />
            </a>
          </div>
        </div>
        <section className="producto__tesla">
          <div className="producto__tesla__parrafo">
            {/* {coche.car} {coche.car_model} */}
            {/* BEV                                 Moto */}
            <h1 className="producto__tesla__parrafo">
              {coche?.marcay_modelo_vehiculo}
            </h1>
            {/* <h5 style={{ color: "gray" }}>
              {coche?.caracteristicas[0].tipoVehiculo} {coche?.tipo_vehiculo}
            </h5> */}
            {/* <div className="text-sm text-gray-500">{coche.caracteristicas[0].tipoVehiculo} - Híbrido xx</div> */}
          </div>
          <section className="producto__tesla__caracteristicas">
            <div className="producto__tesla__parrafo__caracteristicas">             
                  {coche.caracteristicas[0].altasPrestaciones ? (  <p className="chollo" >{coche.tipo_vehiculo} con altas prestaciones</p>) : null}
              <div className="producto__tesla__parrafo__plazos flex items-center">
                {/* <p className="producto__tesla__parrafo__plazas-p"><img src="/images/icono-user.svg" /> 5 plazas</p> */}
                <PeopleAltOutlinedIcon  className="w-6 h-6 mr-2"/>
                <p className="producto__tesla__parrafo__plazas-p">
                  
                  {coche.caracteristicas[0].numPlazas} plazas
                </p>
              </div>
              <div className="producto__tesla__parrafo__plazos flex items-center">
                
                {/* 649 litros   */}
                <p className="producto__tesla__parrafo__litros-p flex items-center">
                  
                  {/*<img src="/images/equipaje.svg" />*/} <LocalDrinkIcon className="mr-2" />
                  {coche.caracteristicas[0].litros} litros
                </p>
              </div>
              <div className="producto__tesla__parrafo__plazos flex items-center">
                
                {/* 547km autonomía   */}
                <BatteryChargingFullRoundedIcon className="w-6 h-6 mr-2"/>
                <p className="producto__tesla__parrafo__autonomia-p">
                  {/*<img src="/images/bateria.svg" /> */}
                  {coche.caracteristicas[0].autonomiaKm}km autonomía
                </p>
              </div>
              <div className="producto__tesla__parrafo__plazos flex items-center">
                <p className="producto__tesla__parrafo__autonomia-p">
                  {/* Automatico/Manual . Mostrarla solo si {coche.tipo_vehiculo}=Coche*/}
                  {/* <Icons.GearManual />   : */}
                   {/* <Icons.GearAutomatic/ > */}
                  <SettingsOutlinedIcon  className="w-6 h-6 mr-2"/>{coche.caracteristicas[0].cajaCambio}
                </p>
              </div>
              <div className="producto__tesla__parrafo__plazos flex items-center" style={{ display: 'flex' }}>
                  <Icon  className="w-6 h-6 mr-2"/>
                <p className="producto__tesla__parrafo__autonomia-p">
                  {/* Automatico/Manual . Mostrarla solo si {coche.tipo_vehiculo}=Coche*/}
                  {/* <SettingsOutlinedIcon />*/}  {text}   {/*{coche.caracteristicas[0].tipoVehiculo}*/}    
                </p>
              </div>              
            </div>
          </section>
        </section>
        <section className="barra__tesla">
          <div className="barra__tesla__precio">
            <div className="barra__tesla__precio__dia">
              <p className="precio__dia">Precio por 1 día</p>
              <h3 className="precio__dia__tesla-especifico">
                
                {/*159€*/}  {/*{coche.precio[0].por1DiaEuros}€*/} {/*coche.price*/}
                {/* {precio}€     */}
                {/* {JSON.stringify(cardVehicleData.precioPorDia)}€            */}
                {precio}€
              </h3>
              {/* mostrar solo si {coche.precio[0].cancelacionGratis}=true */}
              {coche.precio[0].cancelacionGratis ? (
                <div>
                  {/* Si cancelacionGratis es true, se muestra el icono y el texto */}
                  {/* <img className="iconoCheck" src="/images/check.svg" /> */}
                  <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />
                  <p className="barra__precio-Cancelacion__gratuita">
                    Cancelación gratuita
                  </p>
                </div>
              ) : null}
            </div>
          </div>
          {/* <div className="barra__oferta__tesla"> */}
                      {/* <img className="imagen__llave" /*src="images/entrega__llave.png"*/
                    /*src={imagen} src="images/Zero-SRF-360-9.png" /> */}
            {/* <img className="imagen__llave" src="/images/entrega__llave.png" />
          </div> */}
        </section>
      </section>

      {/* <!--contenedor__caja de imagenes Coche-->  */}
    </main>    
    : "" )
  );
};