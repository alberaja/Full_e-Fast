import { useMemo, useState } from 'react'
import * as Icons from './Icons'
import { Chip, Tooltip } from '@mui/material'
import { Link } from 'react-router-dom'
import {cn} from '../../lib'



export default function Card(props) {
    const [selected, setSelected] = useState(0)

    const { id, tipo, nombre, ECO, maletero, tipoMotor, autonomia, limiteKm, descripcion, cajaCambios, cancelacion, precioDia, ofertaEspecial, precioOferta, extras, coverImage, plazas,
        año, comfort, prestaciones, conservacion, todoRiesgo, image, url, idCar, isDisabled

    } = props
    const IconSide = [{ icon: "Information", value: 0 }, { icon: "Car", value: 1, props: { tipo } }, { icon: "Engine", value: 2 }]
    const pegatina = ECO ? 'Cero.webp' : "Eco.webp"


    const IconSidebar = useMemo(() => IconSide.map(({ icon, value, props }) => {
        const Icono = Icons[icon]
        //console.log(props)
        return (<div className={`flex-1 p-2 pl-2 transition-all	${selected === value ? "bg-slate-300" : "bg-slate-200"} `} onClick={() => setSelected(value)} ><Icono selected={selected === value} {...props} className="w-6 h-6 text-black transition-all	" /></div>)

    }), [selected, IconSide])
    const MainProps = { cancelacion, maletero, plazas, descripcion, cajaCambios, limiteKm, tipoMotor }
    const VehiculoProps = { comfort, conservacion, todoRiesgo, extras }
    const MotorProps = { tipoMotor, autonomia, prestaciones }
    const Sections = [<MainContent {...MainProps} />, <VehicleContent {...VehiculoProps} />, <EngineContent {...MotorProps} />]

    const disableClassName=isDisabled?"bg-slate-300 hover:bg-slate-300 text-slate-500 border border-slate-400 select-none cursor-not-allowed":""
    const precioComponent = ofertaEspecial ? <div className='text-xl'>Precio: <span className=" line-through text-gray-500">{precioDia}</span>€<span className="ml-3 font-bold text-green-700 ">{precioOferta} €</span> <span className='ml-2'> &#47; dia</span></div> :
        <div className='text-2xl'> <span className="font-bold">{precioDia} €</span> <span className='ml-2'> &#47; dia</span></div>
    const onClick=isDisabled?(e)=>e.preventDefault:()=>{}
    const Component=isDisabled?"div":Link;
    return (

        <div className="lg:h-80 mx-auto flex flex-wrap bg-slate-200 rounded-lg rounded-bl-none lg:rounded-lg lg:rounded-tr-none  shadow-2xl relative mb-9 lg:mb-0">
            <div className="relative lg:h-80  rounded-lg rounded-b-none lg:rounded-none lg:rounded-l-lg  overflow-hidden  ">
                <img src={`/images/cars/${pegatina}`} alt={nombre} class="absolute bottom-4 left-4 w-7 h-7 " />
                <img src={`/images/card/${image}`} alt={nombre} class=" h-full " />
            </div>
            <div
                className="flex flex-col  px-4 pb-4  justify-start w-full lg:w-[30vw] lg:px-10 lg:py-6 mt-6 lg:mt-0 "
            >
                <h1
                    className="text-gray-900 text-3xl title-font font-medium mb-1"
                >
                    {nombre} ({año})
                </h1>
                <div className="flex flex-col w-full flex-1">
                    {Sections[selected]}
                    </div>
                <div className="flex flex-row  justify-between w-full items-center">
                    {precioComponent}
                    <Tooltip title={isDisabled?"Seleccione un origen y un periodo de alquiler":"Proceder con el alquiler"}  className='flex'>
                        <Component onClick={onClick} to={url.pathname} state={{ diasReservados: url.state.diasReservados }} className={cn(`flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded`,disableClassName)}>Ver oferta </Component>
                     </Tooltip>

                </div>

            </div>
            <div className="absolute -bottom-10 flex lg:-right-10  lg:flex-col lg:top-0 lg:bottom-[inherit] bg-slate-200 divide-y divide-dashed divide-slate-400 rounded-b-lg lg:rounded-none lg:rounded-r-lg  overflow-hidden">
                {/*
                <div className="absolute -right-10 bg-slate-200 divide-y divide-dashed divide-slate-400  rounded-r-lg  overflow-hidden">
                <div className={`flex-1 p-2 pl-5 `} ><Icons.Information selected className="w-6 h-6 text-black" /></div>
                <div className={`flex-1 p-2 pl-5 `} ><Icons.Car className="w-6 h-6 text-black" /></div>
                <div className={`flex-1 p-2 pl-5 `} ><Icons.Engine className="w-6 h-6 text-black" /></div>
                */}
                {IconSidebar}
            </div>
        </div>







    )
}

function MainContent({ cajaCambios, cancelacion, descripcion, maletero, plazas, limiteKm, tipoMotor }) {
    const iconEngines = {
        BEV: { icon: Icons.Electric, text: "100% Eléctrico" , value: "BEV"},
        HEV: { icon: Icons.Fuel, text: "Híbrido no enchufable" , value: "HEV" },
        MHEV: { icon: Icons.Fuel, text: "Hibrido ligero" , value: "MHEV"},
        PHEV: { icon: Icons.FuelElectric, text: "Híbrido Enchufable" , value: "PHEV"},  // text es el tooltip=hover
        SHEV: { icon: Icons.Fuel, text: "Híbrido Puro" , value: "SHEV"},



    }
    const IconsValues = [
        { text: `Caja de cambios de tipo ${cajaCambios} `, Icon: cajaCambios === "Manual" ? Icons.GearManual : Icons.GearAutomatic, value: cajaCambios[0] },
        { text: "Capacidad del maletero", Icon: Icons.Luggage, value: maletero },
        { text: "Plazas del Vehiculo", Icon: Icons.Seat, value: plazas },
        { text: limiteKm < 100 ? `limite de ${limiteKm} kilometros` : "kilometraje ilimitado", Icon: Icons.Limite, value: limiteKm < 100 ? `${limiteKm}km` : "Ilimitado" },
        { text: iconEngines[tipoMotor].text, Icon: iconEngines[tipoMotor].icon, value: iconEngines[tipoMotor].value }
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


// function Extras(listExtras) {
//     const extrasString = {
//         gps: { text: "GPS", tooltip: "Navegación GPS" },
//         sillaBebe: { text: "Bebe", tooltip: "Silla para Bebes" },
//         proteccionenCarretera: { text: "Prot. Carretera", tooltip: "Proteccion en carretera" },
//         opcionSeguroTodoRiesgo: { text: "Opcion Todo riesgo", tooltip: "Seguro todo riesgo opcional" }
//     }
//     const extrasObject = {
//         exenciondeFranquicia: {
//             // TODO: valores estan estatioos solo...   deben ser aleatorios
//             120: { text: "Exencion 120", tooltip: "Excencion Franquicia 120" },
//             180: { text: "Excencion 180", tooltip: "Excencion Franquicia 180" },
//             182: { text: "Excencion 182", tooltip: "Excencion Franquicia 182 y variable randommm" },
//         }

//     }

//     console.log("listaTags: ", listExtras)
//     const listaTags = listExtras.map((extra) => typeof extra === "string" ?
//         <Tooltip title={extrasString[extra].tooltip} key={extra} placement="top"> <Badge label={extrasString[extra].text} variant="outlined" /> </Tooltip> :
//         <Tooltip title={extrasObject[extra.nombre][extra.value].tooltip} key={`${extra.nombre}-${extra.value}`} placement="top"> <Badge label={`${extrasObject[extra.nombre][extra.value].text}`} variant="outlined" /></Tooltip>
//     )    

//     return (<div className="flex  flex-wrap gap-3">

//         {listaTags}
//     </div>
//     )

// }
function Extras(listExtras) {


    const extrasString = {
        gps: { text: "GPS", tooltip: "Navegación GPS" },
        sillaBebe: { text: "Bebe", tooltip: "Silla para Bebes" },
        proteccionenCarretera: { text: "Prot. Carretera", tooltip: "Proteccion en carretera" },
        opcionSeguroTodoRiesgo: { text: "Opcion Todo riesgo", tooltip: "Seguro todo riesgo opcional" }
    }
    const extrasBadge = (nombre, value) => {
        if (nombre === "exenciondeFranquicia")
            return { text: `Exencion ${value}`, tooltip: `Exencion Franquicia ${value}` }
        return { "text": "añadir", "tooltip": "añadir" }

    }

    const listaTags = listExtras.map((extra) => typeof extra === "string" ?
        <Tooltip title={extrasString[extra].tooltip} key={extra} placement="top"> <Badge label={extrasString[extra].text} variant="outlined" /> </Tooltip> :
        <Tooltip  title={`${extrasBadge(extra.nombre, extra.value).tooltip}`} key={`${extra.nombre}-${extra.value}`} placement="top">             <Badge label={`${extrasBadge(extra.nombre, extra.value).text}`} variant="outlined" />         </Tooltip>
    )


    return (<div className="flex  flex-wrap gap-3">

        {listaTags}
    </div>
    )

}

function Badge({ label }) {
    return <div className='inline-flex items-center rounded-full border border-black    px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'>{label}</div>

}
