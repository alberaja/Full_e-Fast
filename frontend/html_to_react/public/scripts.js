/***************** Funcionalidades del CALENDARIO (FECHA DE RECOGIDA y FECHA DE DEVOLUCION*)********************/
let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];

/*Fechas Actuales*/
let currentDate = new Date();//Devuelve Objeto con la fecha del ordenador
let currentDay = currentDate.getDate();//Devuelve el día de la semana
let monthNumber = currentDate.getMonth();//Devuelve el número del més, entre 0 y 11. 0=Enero 
let currentYear = currentDate.getFullYear();//Devuelve el año.

let mesActual = monthNumber;
let diaActual = currentDay;
let añoActual = currentYear;

let selectedDate = currentDate;//Númber 
let selectedDay = currentDay;//Númber hoy
let selectedMonth = monthNumber;//Númber mes+1

let fechaDeRecogida;
let fechaDevolucion;

const date_picker_element = document.querySelector('.grid_iconoCalendario4');//Seleccionamos la clase
const date_picker_element2 = document.querySelector('.grid_iconoCalendario10');//Seleccionamos la clase
const selected_date_element = document.querySelector('.selected-date');//Seleccionamos la clase

let dates = document.getElementById("dates");//Selecciona la id "dates" del HTML y se asigna a dates
let month = document.getElementById("month");//Selecciona la id "month" del HTML y se asigna a month
let year = document.getElementById("year");//Selecciona la id "year" del HTML y se asigna a year

let prevMonthDOM = document.getElementById("prev-month");//Selecciona la id "prev-month" del HTML y se asigna a prevMonthDOM
let nextMonthDOM = document.getElementById("next-month");//Selecciona la id "next-month" del HTML y se asigna a nextMonthDOM

month.textContent = monthNames[monthNumber];//Array que contiene todos los meses del año. Escribe los meses del año del array [monthNumber] 
year.textContent = currentYear.toString();//Devuelve en String el año actual. Escribe el año actual

/*Al hacer el evento click en la FLECHA de avanzar o atrasar*/
prevMonthDOM.addEventListener("click", ()=>lastMonth());//Ponde a ESCUCHAR el evento click y llama a la función lastMonth()
nextMonthDOM.addEventListener("click", ()=>nextMonth());//Ponde a ESCUCHAR el evento click y llama a la función nextMonth()


/*************** Mantiene la sesion (los valores fechaDeRecogida y fechaDevolucion) hasta que se cierra el navegador *****************/

//Se pone la fecha actual en la fecha de recogida de la tabla (.grid_fecha_recogida6)
fechaDeRecogida = document.querySelector(".grid_fecha_recogida6");//Seleccionamos la clase

if(sessionStorage.getItem("fechaDeRecogida1") == null){//Si en la sessionStorage no hay nada (null)
    //Se pone la fecha actual en la fecha de recogida de la tabla (.grid_fecha_recogida6)
    fechaDeRecogida = document.querySelector(".grid_fecha_recogida6");//Seleccionamos la clase
    fechaDeRecogida.innerHTML = (`${currentDay}/${monthNumber+1}/${currentYear}`);//Escribimos la fecha de recogida
    selected_date_element.textContent = formatDate(selectedDate);//Lo pone en formato de fecha 
    sessionStorage.setItem("fechaDeRecogida1",selected_date_element.textContent)
    calcularTodo();
}else{//Si en la sessionStorage si que hay valores
    for(let i=0; i<sessionStorage.length; i++){//Bucle para cada valor de la sessionStorage
        const key = sessionStorage.key(i);//coge cada valor (solo hay uno, fechaDeRecogida)
        console.log(`${key} => ${sessionStorage.getItem(key)}`);//Muestra mientras estes en la sesión (true) seguirá existiendo el valor
        fechaDeRecogida.innerHTML = sessionStorage.getItem("fechaDeRecogida1")//Lo escribimos en grid_fecha_recogida6
    }
}

//Se pone la fecha actual en la fecha de recogida de la tabla (.grid_fecha_recogida6)
fechaDevolucion = document.querySelector(".grid_fechaDevolucion12");//Seleccionamos la clase

if(sessionStorage.getItem("fechaDevolucion1") == null){
//Se pone la fecha actual en la fecha de recogida de la tabla (.grid_fechaDevolucion12)
    fechaDevolucion = document.querySelector(".grid_fechaDevolucion12");//Seleccionamos la clase
    fechaDevolucion.innerHTML = (`${currentDay}/${monthNumber+1}/${currentYear}`);//Escribimos la fecha de recogida
    selected_date_element.textContent = formatDate(selectedDate);//Lo pone en formato de fecha 
    sessionStorage.setItem("fechaDevolucion1",selected_date_element.textContent)
    calcularTodo();
}else{
    for(let i=0; i<sessionStorage.length; i++){
        const key = sessionStorage.key(i);
        console.log(`${key} => ${sessionStorage.getItem(key)}`);
        fechaDevolucion.innerHTML = sessionStorage.getItem("fechaDevolucion1")
    }
}

/*************** Mantiene la sesion (los valores grid_horaEscogida9 y grid_horaEscogida15) hasta que se cierra el navegador *****************/
                  
/*hora de recogida de grid_horaEscogida9*/
var select2 = document.getElementById('grid_horaEscogida9');//Obtenemos el valor por si lo quisieramos tratar en otra página
    select2.addEventListener('change', function(){
    
        let selectedOption = this.options[select2.selectedIndex];
        console.log(selectedOption.value + ': ' + selectedOption.textContent);
    
        selected_date_element.textContent =  selectedOption.value;
        sessionStorage.setItem("horaEscogida1", selected_date_element.textContent)
});

if(sessionStorage.getItem("horaEscogida1") == null){

}else{
    const selectedValue1 = sessionStorage.getItem("horaEscogida1");
    document.querySelector('#grid_horaEscogida9 [value="' + selectedValue1 + '"]').selected = true;
}

/*hora de recogida de grid_horaEscogida15*/
var select = document.getElementById('grid_horaEscogida15');//Obtenemos el valor por si lo quisieramos tratar en otra página
    select.addEventListener('change', function(){
    
        let selectedOption = this.options[select.selectedIndex];
        console.log(selectedOption.value + ': ' + selectedOption.textContent);
    
        selected_date_element.textContent =  selectedOption.value;
        sessionStorage.setItem("horaEscogida2", selected_date_element.textContent)
});

if(sessionStorage.getItem("horaEscogida2") == null){

}else{
    const selectedValue = sessionStorage.getItem("horaEscogida2");
    document.querySelector('#grid_horaEscogida15 [value="' + selectedValue + '"]').selected = true;
}

/*************** FIN DE MANTENER SESIÓN AL CERRAR EL NAVEGADOR *****************/


/*********** Calcular los días cogidos, desde la fecha escogida hasta la fecha devolución (teniendo en cuenta días meses y años)************/
/*************************** MANTIENE LA SESION DE LOS DÍAS RESERVADOS (diasReservados) ***************************/
var diasReservadosContador = 0;

calcularTodo();

function calcularTodo(){//Función para calcular fechaDeRecogida1 y fechaDevolucion1 y mostrar con diasReservados

    //Prohibe ir a otra página y lo pone en color rojo el boton y la fecha en el caso que las fechas no sean correctas
    var botonEvento = document.querySelector(".contenedor__boton16 a");
    botonEvento.getAttribute("href");
    
    var fechaDevolver12 = document.querySelector(".grid_fechaDevolucion12");
    var botonEntero = document.querySelector(".contenedor__boton16");


    /*Cálculo*/
    const diaRecogida = JSON.stringify(sessionStorage.getItem("fechaDeRecogida1")).substring(1,3)//Lo escribimos en grid_fecha_recogida6
    const diaDevolucion = JSON.stringify(sessionStorage.getItem("fechaDevolucion1")).substring(1,3)//Lo escribimos en grid_fechaDevolucion12
    console.log(`dia recogida: ${diaRecogida} y dia de devolución: ${diaDevolucion}`)

    const mesRecogida = JSON.stringify(sessionStorage.getItem("fechaDeRecogida1")).substring(6,8)//Lo escribimos en grid_fecha_recogida6
    const mesDevolucion = JSON.stringify(sessionStorage.getItem("fechaDevolucion1")).substring(6,8)//Lo escribimos en grid_fechaDevolucion12

    console.log(`Mes recogida: ${mesRecogida} y Mes de devolución: ${mesDevolucion}`)

    const anoRecogida = JSON.stringify(sessionStorage.getItem("fechaDeRecogida1")).substring(11,15)//Lo escribimos en grid_fecha_recogida6
    const anoDevolucion = JSON.stringify(sessionStorage.getItem("fechaDevolucion1")).substring(11,15)//Lo escribimos en grid_fechaDevolucion12
    console.log(`Mes recogida: ${anoRecogida}`)
    console.log(`Mes recogida: ${anoDevolucion}`)

    if(mesRecogida == mesDevolucion && anoRecogida == anoDevolucion){//La recogida y la devolución el mismo mes
        diasReservados = diaDevolucion - diaRecogida;//obtenemos los días reservados
        
        if(diasReservados < 0){
            console.log("que pasoo bebe")
            //Color rojo Aviso de que esta mal las fechas
            fechaDevolver12.style.color = "red"
            botonEntero.style.backgroundColor = "red";
            botonEvento.setAttribute("href","");//No dirige a ninguna página

            let diasReservados = -1;
            sessionStorage.setItem("diasReservados", diasReservados);//Se almacenan durante la sesion los diasReservados

        }else if(diasReservados == 0){
            console.log("que pasoo bebe 0 ") 
            //Color azul de siempre porque esta todo correcto
            botonEntero.style.backgroundColor = "#0247FE";
            fechaDevolver12.style.color = "#0247FE";
            botonEvento.setAttribute("href","buscarVehiculo.html");//dirige a la página buscarVehiculo.html

            let diasReservados = 1;
            sessionStorage.setItem("diasReservados", diasReservados);//Se almacenan durante la sesion los diasReservados
            diasReservadosContador = 1
        }else{
            console.log("que pasoo bebe ++++")
            //Color azul de siempre porque esta todo correcto
            botonEntero.style.backgroundColor = "#0247FE";
            fechaDevolver12.style.color = "#0247FE";
            botonEvento.setAttribute("href","buscarVehiculo.html");//dirige a la página buscarVehiculo.html
            sessionStorage.setItem("diasReservados", diasReservados);//Se almacenan durante la sesion los diasReservados
            diasReservadosContador = diasReservados;
        }
        console.log(`dias de reserva: ${diasReservados}`)
    }else if(mesRecogida !== mesDevolucion && anoRecogida == anoDevolucion){//si el mes es distinto y es el mismo año.

        cont = parseInt(mesRecogida);//el mes de recogida 
        diasFaltantesMesRecogida = 0;
        diasFaltantesMesDevolucion = 0;
        sumarMes = 0;

        mesDiferencia = mesDevolucion - mesRecogida;//diferencia de meses
        console.log(`quiero saber el mesDiferencia si es positivo o negativo: ${mesDiferencia}`)
        
        if(mesDiferencia < 0){
            fechaDevolver12.style.color = "red"
            botonEntero.style.backgroundColor = "red";
            botonEvento.setAttribute("href","");//No dirige a ninguna página
        }else if(mesDiferencia == 0){
            diasReservados = diaDevolucion - diaRecogida;//obtenemos los días reservados
        
        if(diasReservados < 0){
            console.log("que pasoo bebe")
            //Color rojo Aviso de que esta mal las fechas
            fechaDevolver12.style.color = "red"
            botonEntero.style.backgroundColor = "red";
            botonEvento.setAttribute("href","");//No dirige a ninguna página

            let diasReservados = -1;
            sessionStorage.setItem("diasReservados", diasReservados);//Se almacenan durante la sesion los diasReservados

        }else if(diasReservados == 0){
            console.log("que pasoo bebe 0 ") 
            //Color azul de siempre porque esta todo correcto
            botonEntero.style.backgroundColor = "#0247FE";
            fechaDevolver12.style.color = "#0247FE";
            botonEvento.setAttribute("href","buscarVehiculo.html");//dirige a la página buscarVehiculo.html

            let diasReservados = 1;
            sessionStorage.setItem("diasReservados", diasReservados);//Se almacenan durante la sesion los diasReservados
            diasReservadosContador = 1
        }else{
            console.log("que pasoo bebe ++++")
            //Color azul de siempre porque esta todo correcto
            botonEntero.style.backgroundColor = "#0247FE";
            fechaDevolver12.style.color = "#0247FE";
            botonEvento.setAttribute("href","buscarVehiculo.html");//dirige a la página buscarVehiculo.html
            sessionStorage.setItem("diasReservados", diasReservados);//Se almacenan durante la sesion los diasReservados
            diasReservadosContador = diasReservados;
        }
        console.log(`dias de reserva: ${diasReservados}`)
        }

        for(i=0; i<mesDiferencia; i++){//Primero sumame todo y luego ya restare!!!!!!!!
        
            if(cont == 12){//si mes es 12 entonces empieza de nuevo en 0 
                console.log(`hola que pasa aqui?¿?¿ ${cont} y ${sumarMes1} => ${devuelveMes(cont)}`)
                
                sumarMes1 = sumarMes1 + devuelveMes(cont);//empezamos mesRecogida por el siguiente mes (+1) y se va a sumar cada mes. Obtenemos la totalidad
                cont = 0;
                console.log(`hola que pasa aqui?¿?¿ ${cont} y ${sumarMes1} => ${devuelveMes(cont)}`)
            }else{
                cont++;//aumentamos mesRecogida (empezando +1 es decir, el mes siguiente) tantas veces como meses haya de diferencia

                sumarMes = sumarMes + devuelveMes(cont);//empezamos mesRecogida por el siguiente mes (+1) y se va a sumar cada mes. Obtenemos la totalidad
                console.log(`meses: ${cont} y ${sumarMes} => ${devuelveMes(cont)}`)//Muestra----------------------------------

                diasFaltantesMesRecogida = devuelveMes(mesRecogida) - diaRecogida;//mesRecogida - diaRecogida = dias del mes de recogida!
                console.log(`dias del mes de recogida: ${diasFaltantesMesRecogida}`)
            }
        }

        function devuelveMes (mess){
            console.log(`bisiesto o no : ${cont} y ${mess}`)//Muestra----------------------------------
            if(mess === -1) mess = 11;
            console.log(`bisiesto o no : ${cont} y ${mess}`)//Muestra----------------------------------

            if (mess == 1 || mess == 3 || mess == 5 || mess == 7 || mess == 8 || mess == 10 || mess == 12) {//Meses de 31 días
                return  31;
        
            } else if (mess == 4 || mess == 6 || mess == 9 || mess == 11) {//Meses de 30 días
                return 30;
        
            } else if(mess == 2){//Año bisiesto o no bisiesto
                if(((0 == anoDevolucion % 4) && (0 != anoDevolucion % 100) || (0 == anoDevolucion % 400)) == true){//true
                    console.log("hola soy bisiesto")
                    return 29;
                }else{//false, no bisiesto
                    console.log("hola NO soy bisiesto")
                    return 28;
                }
            }
        }
        diasFaltantesMesRecogida = diasFaltantesMesRecogida + sumarMes;//Sumamos la diferencia de días del mismo mes y sumamos los días de todos los meses correspondientes 
        console.log(`sumamos del mes de recogida y sumamos los meses de diferencia con la devolución ${diasFaltantesMesRecogida} `)

        if(cont == 12){//si es 12 -> diciembre son 31 días
            diasFaltantesMesDevolucion = 31 - parseInt(diaDevolucion);
        }else{
            diasFaltantesMesDevolucion = devuelveMes(mesDevolucion) - parseInt(diaDevolucion);//el mes de devolución menos día devolución es lo que le falta por restar para saber días reservados
        }

        diasReservados =+  diasFaltantesMesRecogida - diasFaltantesMesDevolucion//Sumamos la totalidad de días y los días de la fecha de devolución (diaDevolucion)

        sessionStorage.setItem("diasReservados", diasReservados);//Se almacenan durante la sesion los diasReservados
        console.log(`Los días totales reservados son!: ${diasReservados}`)
        diasReservadosContador = diasReservados

    }else if(anoRecogida !== anoDevolucion){//si el año es diferente
        
        cont1 = parseInt(mesRecogida);
        diasFaltantesMesRecogida1 = 0;
        diasFaltantesMesDevolucion1 = 0;
        sumarMes1 = 0;
        mesDiferencia1 = 0;

        mesDiferencia1 = parseInt(12 - parseInt(mesRecogida) ) + parseInt(mesDevolucion);//diferencia de meses
        console.log(`diferencia!: ${mesDiferencia1} , ${mesRecogida} , ${mesDevolucion} `)//Muestra la diferencia de meses

        let anoDiferencia = anoDevolucion - anoRecogida;//diferencia de meses
        console.log(`quiero saber el anoDiferencia si es positivo o negativo: ${anoDiferencia}`)

        if(anoDiferencia < 0){
            fechaDevolver12.style.color = "red"
            botonEntero.style.backgroundColor = "red";
            botonEvento.setAttribute("href","");//No dirige a ninguna página
        }else if(anoDiferencia >= 0){
           //Color azul de siempre porque esta todo correcto
           botonEntero.style.backgroundColor = "#0247FE";
           fechaDevolver12.style.color = "#0247FE";
           botonEvento.setAttribute("href","buscarVehiculo.html");//dirige a la página buscarVehiculo.html
        }
        for(i=0; i<mesDiferencia1; i++){//Primero sumame todo y luego ya restare!!!!!!!!
        
            if(cont1 == 12){//si mes es 12 "entra un 13" entonces empieza de nuevo en 0 (ENERO)
                cont1 = 0;
                i--;
            }else{
                cont1++;
                sumarMes1 = sumarMes1 + devuelveMes1(cont1);//empezamos mesRecogida por el siguiente mes (+1) y se va a sumar cada mes. Obtenemos la totalidad
                console.log(`meses1: ${mesRecogida} y ${mesDevolucion} y ${cont1} y: ${mesDiferencia1} => ${devuelveMes1(cont1)} `)//Muestra
                console.log(`meses1: ${cont1} y ${sumarMes1}`)//Muestra
            }
        }

        diasFaltantesMesRecogida1 = devuelveMes1(mesRecogida) - diaRecogida;//mesRecogida - diaRecogida = dias del mes de recogida!
        console.log(`dias del mes de recogida1: ${diasFaltantesMesRecogida1}`)

        function devuelveMes1 (mess){
            console.log(`bisiesto o no : ${cont1} y ${mess}`)//Muestra
            if(mess === -1) mess = 11;
            console.log(`bisiesto o no : ${cont1} y ${mess}`)//Muestra

            if (mess == 1 || mess == 3 || mess == 5 || mess == 7 || mess == 8 || mess == 10 || mess == 12) {//Meses de 31 días
                return  31;
        
            } else if (mess == 4 || mess == 6 || mess == 9 || mess == 11) {//Meses de 30 días
                return 30;
        
            } else if(mess == 2){//Año bisiesto o no bisiesto
                console.log(`MUESTRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA EL AÑO2 ${mess}`);
                console.log(`MUESTRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA EL AÑO2 ${anoDevolucion}`);
                if(((0 == anoDevolucion % 4) && (0 != anoDevolucion % 100) || (0 == anoDevolucion % 400)) == true){//true) == true){
                    
                    console.log("hola soy bisiesto")
                    return 29;
                }else{
                    console.log("hola NO soy bisiesto")
                    return 28;
                }
            }
        }
        diasFaltantesMesRecogida1 = diasFaltantesMesRecogida1 + sumarMes1;//Sumamos la diferencia de días del mismo mes y sumamos los días de todos los meses correspondientes 
        console.log(`sumamos del mes de recogida y sumamos los meses de diferencia con la devolución1 ${diasFaltantesMesRecogida1}`)

        console.log(`hohoooo! jaja ${cont1} y ${devuelveMes1(mesDevolucion)}`)
        diasFaltantesMesDevolucion1 = devuelveMes1(mesDevolucion) - parseInt(diaDevolucion);

        diasReservados =+  diasFaltantesMesRecogida1 - diasFaltantesMesDevolucion1//Sumamos la totalidad de días y los días de la fecha de devolución (diaDevolucion)
        sessionStorage.setItem("diasReservados", diasReservados);//Se almacenan durante la sesion los diasReservados
        
        console.log(`Los días totales reservados son1: ${diasReservados}`)
        diasReservadosContador = diasReservados
    }
}

/*********** FIN DE CALCULAR LOS DÍAS COGIDOS, desde la fecha escogida hasta la fecha devolución ************/

let verificarRecogidaBoolean = 0;//Para que se pueda reutilizar el calendario de fecha de recogida "cuenta al activarse grid_iconoCalendario4"
let verificarDevolucionBoolean = 0;//Para que se pueda reutilizar el calendario de fecha de devolucion "cuenta al activarse grid_iconoCalendario4"
date_picker_element.addEventListener('click', function(){
	verificarRecogidaBoolean ++;
	document.querySelector('.grid_iconoCalendario4').addEventListener("click",toggleDatePicker);
	
});

date_picker_element2.addEventListener('click', function(){
	verificarDevolucionBoolean++;
	document.querySelector('.grid_iconoCalendario10').addEventListener("click",toggleDatePicker);
	
});

function toggleDatePicker (e) {

    if (!checkEventPathForClass(e.path, 'dates')) {
        dates.classList.add('active');//calendar__dates añade la clase active
    }
}
// FUNCIONES DE AYUDA
function checkEventPathForClass (path, selector) {
    for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }
    
    return false;
}

function formatDate (d) {
    let currentDay = d.getDate();//Es otro day aunque es lo mismo
    if (currentDay < 10) {
        currentDay = '0' + currentDay;
    }

    let monthNumber = d.getMonth() + 1;//Es otro monthNumber aunque es lo mismo
    if (monthNumber < 10) {
        monthNumber = '0' + monthNumber;
    }

    let year = d.getFullYear();

    return currentDay + ' / ' + monthNumber + ' / ' + year;
}

/*Funciones*/
const writeMonth = (month) => {//Función que escribe los meses. Recibe de parámetro el més a escribir

    for(let i = startDay(); i>0;i--){//Comprueba el día que tiene que empezar
		const day_element = document.createElement('div');
        day_element.classList.add('calendar__last-days');
		day_element.innerHTML = `${getTotalDays(monthNumber-1)-(i-1)}`;

		dates.appendChild(day_element);
		day_element.addEventListener('click', ()=>obtenerFechaRecogida(i));
    }
    for(let i=1; i<=getTotalDays(month); i++){
        if(i===currentDay) {//Si el día es hoy
			const day_element = document.createElement('div');
			day_element.classList.add('calendar__today');
			day_element.innerHTML = `${i}`;
			dates.appendChild(day_element);

			day_element.addEventListener('click', ()=>obtenerFechaRecogida(i));
        }else{
			const day_element = document.createElement('div');
			day_element.classList.add('calendar__item');
			day_element.innerHTML = `${i}`;
			dates.appendChild(day_element);

			day_element.addEventListener('click', ()=>obtenerFechaRecogida(i));
        }
    }
        const obtenerFechaRecogida = (i) =>{
            let yearr = currentDate.getFullYear();//Devuelve el año.
            selectedDate = new Date(yearr + '-' + (monthNumber+1) + '-' + (i));

            selectedDay = (i + 1);
            selectedMonth = monthNumber;
            selectedYear = yearr;//Númber año

            selected_date_element.textContent = formatDate(selectedDate);//Lo pone en formato de fecha 
            selected_date_element.dataset.value = selectedDate;

			let resultado = selected_date_element.textContent.split("/");//Divide la cadena "04 / 04 / 2023"
			if(verificarRecogidaBoolean > 0 ){//Si se he activado el evento click en grid_iconoCalendario4
				console.log(`recoger ${verificarRecogidaBoolean}`);
				verificarRecogidaBoolean = 0;
				console.log(`recoger! ${verificarRecogidaBoolean}`);
				if(resultado[0] >= currentDay && resultado[1] == mesActual+1 && resultado[2] == añoActual){//Si "04 / 04 / 2023" -> 04 es mayor o igual a hoy

                    let fechaDeRecogida = document.querySelector(".grid_fecha_recogida6");//Seleccionamos la clase
                    sessionStorage.setItem("fechaDeRecogida1", selected_date_element.textContent)
					fechaDeRecogida.innerHTML = sessionStorage.getItem("fechaDeRecogida1");//Escribimos la fecha de recogida
                    calcularTodo();//Llama a la función para calcular

				}else if((resultado[1] > (mesActual+1)) && (resultado[2] == añoActual)){//Si el mes resultado es mayor al mes actual

                    let fechaDeRecogida = document.querySelector(".grid_fecha_recogida6");//Seleccionamos la clase
                    sessionStorage.setItem("fechaDeRecogida1", selected_date_element.textContent)
					fechaDeRecogida.innerHTML = sessionStorage.getItem("fechaDeRecogida1");//Escribimos la fecha de recogida
                    calcularTodo();//Llama a la función para calcular

				}else if(resultado[2] > añoActual){//Si el año resultado es mayor al año actual

                    let fechaDeRecogida = document.querySelector(".grid_fecha_recogida6");//Seleccionamos la clase
                    sessionStorage.setItem("fechaDeRecogida1", selected_date_element.textContent)
					fechaDeRecogida.innerHTML = sessionStorage.getItem("fechaDeRecogida1");//Escribimos la fecha de recogida
                    calcularTodo();//Llama a la función para calcular
                }
			}else if(verificarDevolucionBoolean > 0){//Si se he activado el evento click en grid_iconoCalendario10
				console.log(`devolver ${verificarDevolucionBoolean}`);
				verificarDevolucionBoolean = 0;
				console.log(`devolver! ${verificarDevolucionBoolean}`);
				if(resultado[0] >= currentDay && resultado[1] == mesActual+1){//Si "04 / 04 / 2023" -> 04 es mayor o igual a hoy

                    let fechaDevolucion = document.querySelector(".grid_fechaDevolucion12");//Seleccionamos la clase
                    sessionStorage.setItem("fechaDevolucion1", selected_date_element.textContent)
					fechaDevolucion.innerHTML = sessionStorage.getItem("fechaDevolucion1");//Escribimos la fecha de recogida
                    calcularTodo();//Llama a la función para calcular

				}else if(resultado[1] > (mesActual+1)){//Si el mes resultado es mayor al mes actual

                    let fechaDevolucion = document.querySelector(".grid_fechaDevolucion12");//Seleccionamos la clase
                    sessionStorage.setItem("fechaDevolucion1", selected_date_element.textContent)
					fechaDevolucion.innerHTML = sessionStorage.getItem("fechaDevolucion1");//Escribimos la fecha de recogida
                    calcularTodo();//Llama a la función para calcular

				}else if(resultado[2] > añoActual){//Si el año resultado es mayor al año actual

                    let fechaDevolucion = document.querySelector(".grid_fechaDevolucion12");//Seleccionamos la clase
                    sessionStorage.setItem("fechaDevolucion1", selected_date_element.textContent)
					fechaDevolucion.innerHTML = sessionStorage.getItem("fechaDevolucion1");//Escribimos la fecha de recogida
                    calcularTodo();//Llama a la función para calcular
                }
			}
		}
}

const getTotalDays = month => {//Función del total de días a escribir (si son 28,29,30 o 31)
    if(month === -1) month = 11;

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {//Meses de 31 días
        return  31;

    } else if (month == 3 || month == 5 || month == 8 || month == 10) {//Meses de 30 días
        return 30;

    } else {//Año bisiesto o no bisiesto

        return isLeap() ? 29:28;
    }
}

const isLeap = () => {//Función para saber si el año es bisiesto o no es bisiesto
    
    console.log(`MUESTRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA EL AÑO ${year.textContent}`);

    return ((0 == year % 4) && (0 != year % 100) || (0 == year % 400))//true
}

const startDay = () => {//Función para saber el día que empieza la semana. Saber donde colocar el día 1
    let start = new Date(currentYear, monthNumber, 1);
    return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1;//Así la semana empieza en lunes y no en domingo
}

const lastMonth = () => {//Función que escribe el més anterior
    if(monthNumber !== 0){
        monthNumber--;
    }else{
        monthNumber = 11;
        currentYear--;
    }

    setNewDate();//Llama a la función para establecer la nueva fecha
}

const nextMonth = () => {//Función que escribe el més próximo
    if(monthNumber !== 11){
        monthNumber++;
    }else{
        monthNumber = 0;
        currentYear++;
    }

    setNewDate();//Llama a la función para establecer la nueva fecha
}

const setNewDate = () => {//Establece la nueva fecha al mover el calenadrio
    currentDate.setFullYear(currentYear,monthNumber,currentDay);
    month.textContent = monthNames[monthNumber];
    year.textContent = currentYear.toString();
    dates.textContent = '';//Vacia el mes y se añade el siguiente mes
    writeMonth(monthNumber);
}

writeMonth(monthNumber);


/*******************Funcionalidades de ocultar y mostrar calendario***************************/

document.querySelector('.calendar').style.display="none";//El calendario no ocupa espacio en la pantalla ni se ve
document.querySelector('.calendar__boton').style.display="none";//El calendario no ocupa espacio en la pantalla ni se ve
document.querySelector('.calendar__boton-cancelar').style.display="none";//El calendario no ocupa espacio en la pantalla ni se ve


document.querySelector('.grid_iconoCalendario4').addEventListener("click", ()=>mostrarCalendario());
const mostrarCalendario = ()=>{
	document.querySelector('.calendar').style.display="block";//El calendario ocupa espacio y se muestra
}

document.querySelector('.grid_iconoCalendario10').addEventListener("click", ()=>mostrarCalendario2());
const mostrarCalendario2 = ()=>{
	document.querySelector('.calendar').style.display="block";//El calendario ocupa espacio y se muestra
}

document.querySelector('.cruz__cerrar-icono').addEventListener("click", ()=>OcultarCalendario());
const OcultarCalendario = ()=>{
	document.querySelector('.calendar').style.display="none";//El calendario ocupa espacio y se muestra
}

document.querySelector('.grid_iconoCalendario4').addEventListener("click", ()=>mostrarBotonCalendario());
const mostrarBotonCalendario = ()=>{
	document.querySelector('.calendar__boton').style.display="block";//El calendario ocupa espacio y se muestra
    document.querySelector('.calendar__boton-cancelar').style.display="block";//El calendario ocupa espacio y se muestra
}

document.querySelector('.grid_iconoCalendario10').addEventListener("click", ()=>mostrarBotonCalendario2());
const mostrarBotonCalendario2 = ()=>{
	document.querySelector('.calendar__boton').style.display="block";//El calendario ocupa espacio y se muestra
    document.querySelector('.calendar__boton-cancelar').style.display="block";//El calendario ocupa espacio y se muestra
}

document.querySelector('.calendar__boton').addEventListener("click", ()=>OcultarBotonCalendario());
const OcultarBotonCalendario = ()=>{
	document.querySelector('.calendar__boton').style.display="none";//El calendario ocupa espacio y se muestra
	document.querySelector('.calendar').style.display="none";//El calendario ocupa espacio y se muestra
}

document.querySelector('.calendar__boton-cancelar').addEventListener("click", ()=>OcultarBotonCalendarioCerrrar());
const OcultarBotonCalendarioCerrrar = ()=>{
	document.querySelector('.calendar__boton-cancelar').style.display="none";//El calendario ocupa espacio y se muestra
	document.querySelector('.calendar').style.display="none";//El calendario ocupa espacio y se muestra
}



/*************       Devuelve la hora actual (reloj)
let currentDate1 = new Date();//Devuelve Objeto con la fecha del ordenador      
let hora = currentDate1.getHours();//Devuelve la hora
let minuto = currentDate1.getMinutes();//Devuelve los minutos

let horaActual = hora + ":" + minuto;
let horaRecogida;

horaRecogida = document.querySelector(".selecciona__hora");//Seleccionamos la clase
horaRecogida.innerHTML = horaActual;//Escribimos la fecha de recogida

console.log(`horarecogidas: ${horaActual}`);
**/

/***********El resultado de la Hora de recogida se devuelve donde queramos Ej: clase (".resultado") */
/*
const selected_date_element_time = document.querySelector('.grid_horaEscogida9');//Seleccionamos la clase de horas

selected_date_element_time.addEventListener("click",()=>{

    
    /*
	const selected_date_element_time2 = document.querySelector('.grid_horaEscogida9');
	horaRecogida = document.querySelector(".resultado");//Seleccionamos la clase Ej: clase (".resultado") 
    horaRecogida.innerHTML = selected_date_element_time2.value;//Escribimos la fecha de recogida
    */
/*
})
*/ 
/*
document.querySelector('.nav_hamburguer').addEventListener("click", ()=>mostrarCalendario6());
const mostrarCalendario6 = ()=>{
    document.querySelector('.container__menu__responsive-item-vehiculo').addEventListener("click", ()=>mostrarCalendario4());
}


const mostrarCalendario4 = ()=>{

    const menu = document.querySelector('.container__menu__responsive-item-vehiculo');

    nombreDeClase = "active";
    let valor = menu.classList.contains(nombreDeClase);

    if(valor){
        document.querySelector('.container__menu__responsive-item-vehiculo');
        menu.classList.remove(nombreDeClase);

	    document.getElementById('check:checked').style.height = "420px";//El calendario ocupa espacio y se muestra

    }else{
        document.querySelector('.container__menu__responsive-item-vehiculo');
        menu.classList.add(nombreDeClase);


	    document.getElementById('check:checked').style.height = "none";//El calendario ocupa espacio y se muestra
    }
}
*/



/*
document.querySelector('.container__menu__responsive-item-vehiculo').addEventListener("click", ()=>mostrarCalendario4());

const mostrarCalendario4 = ()=>{

    const menu = document.querySelector('.container__menu__responsive-item-vehiculo');
    menu.classList.toggle("active");

	document.querySelector('.container__menu__responsive-item-vehiculo').style.background = "green";//El calendario ocupa espacio y se muestra
}
*/



/***************** MENU RESPONSIVE (MÓVIL || DESKTOP) ********************/

const esDispositivoMovil = () => window.innerWidth <= 768;//Para poder separar el código javaScript del móvil y desktop

function obtenerTamanioActual(){//Obtiene tamaño de la Ventana según cambie su tamaño (función de HTML)
    if(esDispositivoMovil()){//Es dispositivo móvil

        document.querySelector('.nav_hamburguer').style.display = "block";
    
        document.getElementById("check").addEventListener("click", mostrar_menu);
        document.querySelector(".container__menu__responsive-item-vehiculo").addEventListener("click", ocultar_menu);
    
        background_menu = document.querySelector(".container__menu__responsive");
        items = document.querySelectorAll(".container__menu__responsive-item");
    

        for(let i = 0; i<3; i++){
            items[i].style.display = "none";
        }
        background_menu.style.display = "none";

        let inicio = 0;//permite cerrar con móvil la hamburguesa
        function mostrar_menu(){
            inicio++;
    
            background_menu.style.height = "420px";
            background_menu.style.display = "block";
  
        
            for(let i = 0; i<3; i++){
                items[i].style.display = "block";
            }

            if(inicio >= 2){
                ocultar_menu();
            }
        }
    
        function ocultar_menu(){
            background_menu.style.display = "none";
            background_menu.style.height = "0px";
            inicio = 0;
        }
    }
    

    if(!esDispositivoMovil()){//Es Desktop

        document.querySelector(".container__menu__responsive-item-vehiculo").addEventListener("click", mostrar_menu);
        document.querySelector('.nav_hamburguer').style.display = "none";
        document.querySelector(".container__menu__responsive").style.display = "flex";
       

        background_menu = document.querySelector(".container__menu__responsive");
        items = document.querySelectorAll(".container__menu__responsive-item");
    
        background_menu.style.display = "none";
        
        function mostrar_menu(){
            background_menu.style.display = "flex";
        
            for(let i = 0; i<3; i++){
                items[i].style.display = "flex";
            }
        }
        mostrar_menu();
    }
}


/**************************************CONTACTO Y CONTACTANOS OCULTO*******************************************/

document.querySelector(".contactos__solicitado").addEventListener("click", ()=>{//EL DEL NAV CONTACTA

    document.querySelector(".contenedor__contacto__contactanos").style.display = "block";
    document.querySelector("nav").style.opacity = "0.2";
    document.querySelector(".jobs").style.opacity = "0.2";
    document.querySelector(".contenedor__caja").style.opacity = "0.2";
    document.querySelector(".contenedor__caja__vehiculos").style.opacity = "0.2";
    document.querySelector(".contenedor__caja__contactanos").style.opacity = "0.2";
    document.querySelector(".contenedor__contacto__conocernos").style.opacity = "0.2";
    document.querySelector(".footer__informacion").style.opacity = "0.2";
})
document.querySelector(".boton__contáctanos").addEventListener("click", ()=>{//EL DEL CONTÁCTANOS

    document.querySelector(".contenedor__contacto__contactanos").style.display = "block";
    document.querySelector("nav").style.opacity = "0.2";
    document.querySelector(".jobs").style.opacity = "0.2";
    document.querySelector(".contenedor__caja").style.opacity = "0.2";
    document.querySelector(".contenedor__caja__vehiculos").style.opacity = "0.2";
    document.querySelector(".contenedor__caja__contactanos").style.opacity = "0.2";
    document.querySelector(".contenedor__contacto__conocernos").style.opacity = "0.2";
    document.querySelector(".footer__informacion").style.opacity = "0.2";

    document.querySelector(".contenedor__contacto__contactanos").style.top = "1600px";
})


/******************************** FORMULARIO ********************************/
const form = document.getElementById('form');
const inputs1 = document.querySelectorAll('#form input');//Selecciona todos los formulario con cada input


const expresiones = {
    /*Datos del conductor principal*/
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, //hasta 40 carácteres
	telefono: /^\d{9}$/,//9 dígitos
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}

const campos = {//si el campo está valido o no. por defecto siempre está false.
    /*Datos del conductor principal*/
    nombre: false,
	telefono: false,
    email: false,
}

const validarFormulario = (e) => {//Función que se ejecuta cada vez que el usuario teclea en un input
	switch (e.target.name) {//el nommbre del input sea nombreTarjeta o numeroTarjeta o fechaCaducidad o cvc o...
		/*Datos del conductor principal*/
        case "nombre":
			validarCampo1(expresiones.nombre, e.target, 'nombre');//Llama a la función validarCampo y le pasa los 3 parámetros
		break;
		case "telefono":
			validarCampo1(expresiones.telefono, e.target, 'telefono');
		break;
        case "email":
			validarCampo1(expresiones.email, e.target, 'email');
		break;
	}
}

const imageCheck = document.createElement('img');
imageCheck.src  = 'images/check.svg';

const imageError = document.createElement('img');
imageError.src  = 'images/icono-error.svg';


const validarCampo1 = (expresion, input1, campo1) => {//Parámetros de entrada: expresion, input, campo1
	if(expresion.test(input1.value)){//si la expresión regular del input (nombreTarjeta o...) es true entonces ejecuta 
		document.getElementById(`grupo__${campo1}`).classList.remove('form__grupo-incorrecto');//elimina la clase
		document.getElementById(`grupo__${campo1}`).classList.add('form__grupo-correcto');//añade la clase
		document.querySelector(`#grupo__${campo1} img`).insertAdjacentHTML("afterend",`<img src=${imageCheck.src} class="form__validacion-estado">`);
		document.querySelector(`#grupo__${campo1} img`).remove("afterend",`<img src=${imageError.src}class="form__validacion-estado">`);
		document.querySelector(`#grupo__${campo1} .form__input-error`).classList.remove('form__input-error-activo');//Elimina la clase del error
		campos[campo1] = true;//el campo es igual = true
	} else {
		document.getElementById(`grupo__${campo1}`).classList.add('form__grupo-incorrecto');
		document.getElementById(`grupo__${campo1}`).classList.remove('form__grupo-correcto');
		document.querySelector(`#grupo__${campo1} img`).insertAdjacentHTML("afterend",`<img src=${imageError.src} class="form__validacion-estado">`);
		document.querySelector(`#grupo__${campo1} img`).remove("afterend",`<img src=${imageCheck.src}class="form__validacion-estado">`);
		document.querySelector(`#grupo__${campo1} .form__input-error`).classList.add('form__input-error-activo');//Añade (mensaje) la clase del error
		campos[campo1] = false;//el campo no es igual = false
	}
}



inputs1.forEach((input1) => {//Ejecuta todos los input que tenemos
	input1.addEventListener('keyup', validarFormulario);//Para cada input se aplica un evento de escucha y keyup es un evento de tecla arriba (el usuario deja de pulsar una tecla)
	input1.addEventListener('blur', validarFormulario);//blur es cuando un elemenot ha perdido su foco
});


form.addEventListener('submit', (e) => {//el boton de enviar ejecutará siempre y cuando (if) todos los campos esten correctos
	e.preventDefault();//No deja que el enlace se abra

    const terminos = document.getElementById('terminos');//también tiene en cuenta terminos
	if(campos.nombre && campos.telefono && campos.email && terminos.checked){
		form.reset();//Reinicia todos los campos formulario
 
		document.querySelectorAll('.form__grupo-correcto').forEach((icono) => {
			//icono.classList.remove('form__grupo-correcto');
			const boton = document.querySelector('#form button');//Selecciona todos los formulario con cada input
			boton.style.backgroundColor = "#008000";//El fondo del boton en color verde
			boton.style.borderColor = "#008000";//El borde del boton en color verde
			setTimeout(()=>{
				boton.style.backgroundColor = "#0247FE";//Lo vuelve a dejar en azul a los 2 segundos
				boton.style.borderColor = "#0247FE";//Lo vuelve a dejar en azul el borde a los 2 segundos
				icono.classList.remove('form__grupo-correcto');//Elimina el icono (tick verde) a los 2 segundos
			},2000);

		});

	} else {//si todos los campos no son correctos
		const boton = document.querySelector('#form button');//Selecciona todos los formulario con cada input
        boton.style.backgroundColor = "red";
		boton.style.borderColor = "red";//El borde del boton en color rojo
		
        setTimeout(()=>{
            boton.style.backgroundColor = "#0247FE";//Lo vuelve a dejar en azul a los 2 segundos
			boton.style.borderColor = "#0247FE";//Lo vuelve a dejar en azul el borde a los 2 segundos
        },2000);
    }
});




