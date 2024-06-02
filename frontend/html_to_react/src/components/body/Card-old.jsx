import { useMemo, useState } from 'react'
import * as Icons from './Icons'
import { Chip, Tooltip } from '@mui/material'
import { Link, Route } from 'react-router-dom';
import { useStoreVehiculo } from '../../zustand/store';


const IconSide = [{ icon: "Information", value: 0 }, { icon: "Car", value: 1 }, { icon: "Engine", value: 2 }]

export default function Card(props) {
    const [selected, setSelected] = useState(0)
    const { id, tipo, nombre, ECO, maletero, tipoMotor, autonomia, limiteKm, descripcion, cajaCambios, cancelacion, precioDia, ofertaEspecial, precioOferta, extras, coverImage, plazas,
        año, comfort, prestaciones, conservacion, todoRiesgo
        , url, diasReservados,idCar
    } = props    
    const pegatina = ECO ? 'Cero.webp' : "Eco.webp"

    // Zustand
    const {setIdVehiculo,carData,updateDataCar} = useStoreVehiculo() // carData es donde esta la informacion de toda la data

    // console.log("url-->", url);
    // console.log("diasReservados-->", url.state.diasReservados);
    let ruta = url.pathname;

    const IconSidebar = useMemo(() => IconSide.map(({ icon, value }) => {
        const Icono = Icons[icon]
        return (<div className={`flex-1 p-2 pl-2 transition-all	${selected === value ? "bg-slate-300" : "bg-slate-200"} `} onClick={() => setSelected(value)} ><Icono selected={selected === value} className="w-6 h-6 text-black transition-all	" /></div>)
    }), [selected])
    const MainProps = { cancelacion, maletero, plazas, descripcion, cajaCambios, limiteKm }
    const VehiculoProps = { comfort, conservacion, todoRiesgo, extras }
    const MotorProps = { tipoMotor, autonomia, prestaciones }
    const Sections = [<MainContent {...MainProps} />, <VehicleContent {...VehiculoProps} />, <EngineContent {...MotorProps} />]


    const precioComponent = ofertaEspecial ? <div className='text-xl'>Precio: <span className=" line-through text-gray-500">{precioDia}</span>€<span className="ml-3 font-bold text-green-700 ">{precioOferta} €</span> <span className='ml-2'> &#47; dia</span></div> :
        <div className='text-xl'> Precio: <span className="font-bold">{precioDia} €</span> <span className='ml-2'> &#47; dia</span></div>
    return (

        <div className="lg:h-80 mx-auto flex flex-wrap bg-slate-200 rounded-lg rounded-tr-none  shadow-2xl relative">
            <div className="relative lg:h-80 rounded-l-lg overflow-hidden ">
                <img src={`/images/cars/${pegatina}`} alt={nombre} class="absolute bottom-4 left-4 w-14 h-14 " />
                <img src={`/images/cars/${coverImage}`} alt={nombre} class=" h-full " />
            </div>
            <div
                className="flex flex-col   justify-start lg:w-[30vw] lg:px-10 lg:py-6 mt-6 lg:mt-0 "
            >
                <h1
                    className="text-gray-900 text-3xl title-font font-medium mb-1"
                >
                    {nombre} ({año})
                </h1>
                {/* Zustand */}
                {/* {JSON.stringify(carData.numeroDiasReservados)}
                {JSON.stringify(carData.vehiculoId)} */}
                <div className="flex flex-col w-full flex-1">
                    {Sections[selected]}
                </div>
                <div className="flex justify-between w-full items-center">
                    {precioComponent}
                    {/* <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                        Alquilar
                    </button> */}
                    {/* { console.log("URL:", url.state.diasReservados) } */}
                    {/* <Link to={ url }   className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Ver oferta</Link> */}
                    {/* <Link to={{ url , state: { diasReservados, coche: coche.car_model, price: coche.price } }}>Ver oferta</Link>     */}
                    {/* <Link to={{ url, state: { diasReservados: url.state.diasReservados } }} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"> Ver oferta </Link> */}
                    {/*React-router-dom v5 <Link to={{  pathname: url.pathname , state: { diasReservados: url.state.diasReservados }}} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"> Ver oferta </Link> */}
                    {/*React-router-dom v6 */}
                    <Link to={url.pathname} state={{ diasReservados: url.state.diasReservados }} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"> Ver oferta </Link>
                    {/* Zustand */}
                    <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={() => {
                        updateDataCar({numeroDiasReservados: url.state.diasReservados, vehiculoId : idCar, vehiculoMarcaModelo: nombre })
                    }}>prueba Zustand</button>
                    
                </div>

            </div>
            <div className="absolute -right-10 bg-slate-200 divide-y divide-dashed divide-slate-400  rounded-r-lg  overflow-hidden">
                {/*
                <div className={`flex-1 p-2 pl-5 `} ><Icons.Information selected className="w-6 h-6 text-black" /></div>
                <div className={`flex-1 p-2 pl-5 `} ><Icons.Car className="w-6 h-6 text-black" /></div>
                <div className={`flex-1 p-2 pl-5 `} ><Icons.Engine className="w-6 h-6 text-black" /></div>
                */}
                {IconSidebar}
            </div>
        </div>







    )
}

function MainContent({ cajaCambios, cancelacion, descripcion, maletero, plazas, limiteKm }) {
    const IconsValues = [
        { text: `Caja de cambios de tipo ${cajaCambios} `, Icon: cajaCambios === "Manual" ? Icons.GearManual : Icons.GearAutomatic, value: cajaCambios[0] },
        { text: "Capacidad del maletero", Icon: Icons.Luggage, value: maletero },
        { text: "Plazas del Vehiculo", Icon: Icons.Seat, value: plazas },
        { text: limiteKm < 10000 ? `limite de ${limiteKm} kilometros` : "kilometraje ilimitado", Icon: Icons.Limite, value: limiteKm < 1000000000 ? `${limiteKm} km` : "Ilimitado" }
    ]

    const InfoIcons = IconsValues.map(({ text, Icon, value }) => <Tooltip title={text} key={text} className='flex'><Icon className=" w-5 h-5" style={{ verticalSlign: "text-bottom" }} /> <span className='ml-2 mr-4 text-base font-semibold '>{value}</span></Tooltip>)
    const cancelacionDiv = cancelacion ? <div className="text-green-600 flex gap-2 mt-2" > <Icons.Free className=" w-5 h-5" /> Cancelacion Gratuita  </div> : <Tooltip title="Añada el seguro de cancelación durante el proceso de pago"><div className="text-slate-800 flex gap-2 mt-2" > <Icons.Optional className=" w-5 h-5" /> Cancelacion opcional  </div></Tooltip>
    return (
        <div className={`flex flex-col w-full flex-1 `}>
            <div className=" flex items-center  mt-1">
                {InfoIcons}
            </div>
            {cancelacionDiv}


            <div className="flex-1 mt-3">
                {descripcion}
            </div>
        </div>
    )
}
function VehicleContent(props) {
    const { comfort, conservacion, extras } = props
    const comfortComp = comfort && <div ><span >Confort: </span><span className='font-bold'>Alto</span> </div>
    const estadoComp = conservacion && <div ><span >Estado: </span> <span className='font-bold'>Buen Estado</span></div>

    return (
        <div className={`pl-3 flex flex-col w-full flex-1`}>
            <h3 className='font-bold text-lg'>Caracteristicas:</h3>
            <div className='pl-2 text-sm'>
                {comfortComp}
                {estadoComp}
            </div>
            <h3 className='pt-3 font-bold text-lg'>Extras:</h3>
            <div className='pl-2 text-sm'>
                {Extras(extras)}
            </div>

        </div>
    )
}

function EngineContent({ tipoMotor, autonomia, prestaciones }) {
    const prestacionesComp = prestaciones && <div ><span > Gama:</span> <span className='font-bold'>Altas Prestaciones</span></div>
    return (
        <div className={`flex flex-col w-full flex-1 `}>
            <h3 className='font-bold text-lg'>Motor</h3>
            <div className='pl-2 text-sm'>
                <div ><span > Tipo: </span><span className='font-bold'>{tipoMotor}</span></div>
                <div ><span > Autonomia: </span><span className='font-bold'>{autonomia} km</span></div>
                {prestacionesComp}
            </div>
        </div>
    )
}


function Extras(listExtras) {
    const extrasString = {
        gps: { text: "GPS", tooltip: "Navegación GPS" },
        sillaBebe: { text: "Bebe", tooltip: "Silla para Bebes" },
        proteccionenCarretera: { text: "Prot. Carretera", tooltip: "Proteccion en carretera" },
        opcionSeguroTodoRiesgo: { text: "Opcion Todo riesgo", tooltip: "Seguro todo riesgo opcional" }
    }
    const extrasObject = {
        exenciondeFranquicia: {
            120: { text: "Exencion 120", tooltip: "Excencion Franquicia 120" },
            180: { text: "Excencion 180", tooltip: "Excencion Franquicia 180" },
        }

    }

    const listaTags = listExtras.map((extra) => typeof extra === "string" ?
        <Tooltip title={extrasString[extra].tooltip} key={extra} placement="top"> <Badge label={extrasString[extra].text} variant="outlined" /> </Tooltip> :
        <Tooltip title={extrasObject[extra.nombre][extra.value].tooltip} key={`${extra.nombre}-${extra.value}`} placement="top"> <Badge label={`${extrasObject[extra.nombre][extra.value].text}`} variant="outlined" /></Tooltip>
    )

    return (<div className="flex  flex-wrap gap-3">

        {listaTags}
    </div>
    )

}

function Badge({ label }) {
    return <div className='inline-flex items-center rounded-full border border-black    px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'>{label}</div>

}
