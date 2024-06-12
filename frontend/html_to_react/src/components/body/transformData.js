
export function transformdata(coche) {
    const caracteristicas = coche.caracteristicas[0]
    const precio = coche.precio[0]
    const extras = coche.extras[0]
    const extrasArray = Object.keys(extras).reduce((extrasList, key) => {
        if (extras[key] === true)
            return [...extrasList, key]
        if (extras[key] === false)
            return extrasList
        return [...extrasList, { nombre: key, value: extras[key] }]
    }, [])

    const data = {

        id: coche.id,
        tipo: coche.tipo_vehiculo,
        image: coche.imagen_url,
        coverImage: `${coche.marca_vehiculo}-${coche.id}.webp`,
        nombre: coche.marcay_modelo_vehiculo,
        modelo: coche.car_model,

        limiteKm: caracteristicas.maximodeKm,
        descripcion: caracteristicas.descripcion,

        ECO: caracteristicas.etiquetaECO === true,
        plazas: caracteristicas.numPlazas,
        cajaCambios: caracteristicas.cajaCambio,
        maletero: caracteristicas.numeroBolsasmaletero,
        precioDia: precio.por1DiaEuros,
        precioOferta: precio.precioOferta,
        ofertaEspecial: precio.ofertaEspecial,
        cancelacion: precio.cancelacionGratis,
        extras: extrasArray,
        año: caracteristicas.año,
        autonomia: caracteristicas.autonomiaKm,
        comfort: caracteristicas.altoConfort,
        prestaciones: caracteristicas.altasPrestaciones,
        conservacion: caracteristicas.perfectoEstado,
        tipoMotor: caracteristicas.tipoVehiculo,


    }

    return data

}
