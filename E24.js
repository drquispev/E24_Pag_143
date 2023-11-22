function CALCULAR_INTERVALOS_CONFIANZA(X,S,N,Nivel_Aceptacion) {
    // Calcular Intervalos de Confianza

    let IC = [];
    let NA = Nivel_Aceptacion;// Asumir 95% de nivel de aceptación
    let alpha = 1 - NA;

    let P1 = X - S / Math.sqrt(N) * (Calcular_Factor_T(499,0.025)); 
    let P2 = X + S / Math.sqrt(N) * (Calcular_Factor_T(499,0.025));


    IC.push(P1,P2);
    return IC;
}

function Calcular_Factor_T(Grados_Libertad, Area_Cola_Derecha){
    let r = Grados_Libertad;
    let alpha = Area_Cola_Derecha;

    let Array_r = [];
    let Array_alpha = [0.25, 0.1, 0.05, 0.025, 0.01, 0.005];

    for(let i = 0; i <= 100; i++){
        if (i != 100) {
            Array_r[i] = i + 1;
        } else {
            Array_r[i] = `∞`;
        }
    }

    let TABLA_DISTRIBUCION_T = [0.6745, 1.2816, 1.6449, 1.96, 2.3263,2.5758 ];
    if(r > 100) {
        r = 101;
    }
    for (let i = 0; i < Array_alpha.length; i++) {
        if (alpha == Array_alpha[i]) {
            alpha = i;
        }
    }
    return TABLA_DISTRIBUCION_T[alpha];
}

// GENERAR NÚMEROS PSEUDOALEAORIOS
// 2.2.1 Algoritmo de cuadrados medios
function CUADRADOS_MEDIOS(seed,Cantidad) {
	let Xo = seed; // Semilla
 	let D = (seed.toString()).length;
	if(D>3) {
    	let Yo, Xi, ri;
    	let Pseudorandom_Numbers = [];

    	console.log(`D: ${D}`);
    	for (let i = 0; i< Cantidad; i++) {
    		// Yo
    	 	Yo = Math.pow(Xo,2);
    		// Xo
    		Xi = Yo.toString();
    		// Longitud de Yo
    		let aux = (Yo.toString()).length; 
    		if(aux % 2 == 0 ){
    			console.log(aux);
     			let Position = Math.floor((aux - D) / 2);
     			ri = Xi.substring(0+Position,aux - Position);
    		} else {
    			Xi = "0" + Xi;
	    		aux ++;
	    		let Position = Math.floor((aux - D) / 2);
		     	ri = Xi.substring(0+Position,aux - Position);
    		} 
	     	let rif = ri / (10**D);
	    	Pseudorandom_Numbers.push(rif);
	    	//console.log(`Yo: ${Yo} aux: ${aux}`);
	    	//console.log(`Position: ${Position}`,`ri: ${ri}`)
	    	Xo = parseInt(ri);
	    }
    	console.log(Pseudorandom_Numbers);
	
        return Pseudorandom_Numbers;
    }
	else {
		console.log(`ERROR -> D: ${D} \n`);
		console.log(`Condición Incumplida: D > 3 \n`);
	}
}


//  PRUEBAS ESTADISTÍSTICAAS
function B(){}

// GENERAR VARIABLES ALEATORIAS
function Distribucion_Uniforme(ri, a, b){
    // Xi = a + (b - a)ri   
    let Resultado = a + (b - a) * ri;

    return Resultado;
}

function Distribucion_Exponencial(ri,lambda) {
    //let Resultado = -(1/lambda)*(Math.log(1 - ri));
    let Resultado = -lambda*(Math.log(1 - ri));
    return Resultado;
}


/* EJERCICIO 24 */
function Desarrollo_E24(Numero,Media,Desviacion_E,Costo_U,Precio_VU,Descuento){
    let N = Numero;
    let X = Media;
    let S = Desviacion_E;
    let CCA = Costo_U;
    let PVU = Precio_VU;
    let D = Descuento;

    let IC = CALCULAR_INTERVALOS_CONFIANZA(X,S,N,0.95);
    //let NPR = CUADRADOS_MEDIOS(17857359,500);
    let NPR = CUADRADOS_MEDIOS(17055,500);
    let VA = [];
    let MATRIX_RESULTANTE = [];

    let Cont_Desc = 0;
    let Cont_Sin_Desc = 0;
    for (let i = 0; i < N; i++) {
        VA.push(Distribucion_Uniforme(NPR[i],IC[0],IC[1]));
        if(Distribucion_Uniforme(NPR[i],IC[0],IC[1]) > 1.7){
            Cont_Desc++;
        } else {
            Cont_Sin_Desc++;
        }
        //VA.push(Distribucion_Exponencial(NPR[i],X));
        MATRIX_RESULTANTE.push([ i+1 , NPR[i] , VA[i] ]);
    }
    console.log(VA);

    // ------------------------------------------------------------------------------- >
    // TABLA - DOM 
	var Contenedor = document.getElementById("Resolucion");

	var Contenedor_Tabla = document.createElement("div");
	var Tabla = document.createElement("table");
	Tabla.id = "Tabla_E22";

	// CABECERAS - DOM 
	var Tabla_Fila_Head = document.createElement("tr");
	Tabla_Fila_Head.id = "Fila_Head";
	Tabla_Fila_Head.className = "Fila";

	var Fila_Celda_A = document.createElement("th");
	Fila_Celda_A.className = "Celda_Head";
	Fila_Celda_A.textContent = "Ataúd";
	Tabla_Fila_Head.appendChild(Fila_Celda_A);
	
	var Fila_Celda_B = document.createElement("th");
	Fila_Celda_B.className = "Celda_Head";
	Fila_Celda_B.textContent = "ri";
	Tabla_Fila_Head.appendChild(Fila_Celda_B);
	
	var Fila_Celda_C = document.createElement("th");
	Fila_Celda_C.className = "Celda_Head";
	Fila_Celda_C.textContent = "Xi (metros)";
	Tabla_Fila_Head.appendChild(Fila_Celda_C);

	Tabla.appendChild(Tabla_Fila_Head);

	// DATOS - DOM
	for (let i = 0; i < N; i++ ) {
		var Tabla_Fila_Date = document.createElement("tr");
		Tabla_Fila_Date.id = "Fila_Date";
		Tabla_Fila_Date.className = "Fila";
		for (let j = 0; j < 3; j++) {
			var Fila_Celda = document.createElement("td");
			Fila_Celda.className = "Celda_Date";
			Fila_Celda.textContent = `${MATRIX_RESULTANTE[i][j]}`; 
			Tabla_Fila_Date.appendChild(Fila_Celda);
		}
		Tabla.appendChild(Tabla_Fila_Date);
	}

	Contenedor_Tabla.appendChild(Tabla);
	Contenedor.appendChild(Contenedor_Tabla);

    //------------------------------------------------------------------------------- >

    // a) Cantidad de difuntos q tendran Desc.
    console.log(`CD: ${Cont_Desc} \n CSD: ${Cont_Sin_Desc} `);

    // b) La utilidad promedio por este concepto
    let ASD = Cont_Sin_Desc * 8000; 
    let ACD = Cont_Desc * 8000 * 0.95;

    let Utilidad_Promedio = ASD + ACD;
    console.log(`ACD: ${ACD} \n ASD: ${ASD} \n UP:${Utilidad_Promedio}`)
}

Desarrollo_E24(500,1.65,0.05,3000,8000,0.05);