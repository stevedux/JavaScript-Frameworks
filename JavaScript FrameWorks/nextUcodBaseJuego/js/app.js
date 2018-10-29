

///	CREAR ELEMENTO
function CrearElemento(col,fila){

	do {
		var nro = Math.floor(Math.random() * 5);
	}
	while (nro == 0 || nro > 4);


	var elemento = "<img src='image\\" + nro + ".png' class='elemento' tipo='" + nro 
		+ "' col='" + col + "' fila='" + fila + "' id='" + contadorElementos++ +"'>"

	return elemento;
}


function ReiniciarTablero(){

	for (var col = 1; col < 8; col++) {

		// RELLENO EL TABLERO
		for (var fila = 1; fila < 8; fila++) {

			$(".col-" + col).append(CrearElemento(col,fila))

		}	
	}

	Animar()

	//$(".elemento").on("click", EliminarElemento).draggable()
	$(".elemento").draggable(
		{ grid: [ 100, 100 ] });

}


function completarTablero(){

	for (var col = 1; col < 8; col++) {

		//CALCULAR LOS FALTANTES
		var faltantes = 7 - $(".col-" + col + " img").length
		var arranca = 8 - faltantes

		//console.log("faltantes: " + faltantes + " - arranca: " + arranca)

		// RELLENO EL TABLERO
		for (var fila = arranca; fila < 8; fila++) {

			$(".col-" + col).prepend(CrearElemento(col,fila))

			$(".col-" + col + " img").animate({top: "0px"},1000).draggable(
																	{ grid: [ 100, 100 ] });

		}	
	}

	 var chequeoTableroTimer = setInterval(timerChequeoTablero(),3000)


}





function Animar(){	

	if (columnaActual <= 7){

		$(".col-" + columnaActual + " .elemento").animate(
			{top: "0px"},500,function(){
			setTimeout(function() {
				columnaActual++
				Animar();
			},500);
				
		}) 
	}
}


function CompletarColumna(columna){

	// CUENTO LOS ITEMS FALTANTES
	var faltantes = 8 - $(".col-" + columna + " .elemento").length

	console.log("falt:"+ faltantes)

}



function asignarDroppable(event, ui){

      	origen = ui.draggable
      	destino = $(this)

      	origTemp = ui.draggable.clone()
      	destTemp = $(this).clone()

  
         $(origTemp).draggable(
		{ grid: [ 100, 100 ] }).css({top: "0", left: "0"})

         $(destTemp).draggable(
		{ grid: [ 100, 100 ] }).css({top: "0", left: "0"})

         $(origTemp).droppable({
	      accept: ".elemento",

	      drop: asignarDroppable
	    })

         $(destTemp).droppable({
	      accept: ".elemento",

	      drop: asignarDroppable
	    })


         origen.replaceWith(destTemp)
         destino.replaceWith(origTemp)    


         // INCREMENTAR MOVIMIENTO
         incrementarMovimiento() 
 

         //// BUSCAR MATCHES O COINCIDENCIAS
     	elementos = buscarCoincidencias()

         if ($(elementos).length > 0){
     		resultado = EliminarElementos($(elementos)) 				
 		}   

 		setTimeout(function(){
 			completarTablero()    
 		},3000)

 		 

}


function buscarCoincidencias(){

	var elementosCol = []
	var elementosEliminar = "", elementosEliminarTemp = ""

	//BUSQUEDA VERTICAL /////////////////
	for (var c = 1; c < 8; c++) {

		var contadorConincidencias = 1

		elementosCol[c] = $(".col-" + c + " img");

		//console.log("===> columna: " + c)

		for (var i = 0; i < 6; i++) {
			
			var Comparar = $(elementosCol[c][i]).attr("tipo")
			var CompararCon = $(elementosCol[c][i+1]).attr("tipo") 

			//console.log(Comparar + " == " + CompararCon)

			if (Comparar == CompararCon){
				contadorConincidencias++

				 elementosEliminarTemp += "#" + $(elementosCol[c][i]).attr("id") + ",#" + $(elementosCol[c][i+1]).attr("id") + "," 

				
			}else{

				if (contadorConincidencias >= 3){
					//console.log("Match: col-" + c + " - " + contadorConincidencias)

					elementosEliminar += elementosEliminarTemp

				}

				contadorConincidencias = 1
				elementosEliminarTemp = ""

			}

		}

		if (contadorConincidencias >= 3){
			//console.log("Match: col-" + c + " - " + contadorConincidencias)

			elementosEliminar += elementosEliminarTemp
		}		

	}


	///// BUSQUEDA HORIZONTAL ////
	for (var f = 0; f < 7; f++) {

		contadorConincidencias = 1
		elementosEliminarTemp = ""

		//console.log("===> Fila: " + f)

		for (var c = 1; c < 7; c++) {
			
			var Comparar = $(elementosCol[c][f]).attr("tipo")
			var CompararCon = $(elementosCol[c+1][f]).attr("tipo") 

			//console.log(Comparar + " == " + CompararCon)

			if (Comparar == CompararCon){
				contadorConincidencias++

				elementosEliminarTemp += "#" + $(elementosCol[c][f]).attr("id") + ",#" + $(elementosCol[c+1][f]).attr("id")  + "," 

				
			}else{

				if (contadorConincidencias >= 3){
					//console.log("Match: fila-" + f + " - " + contadorConincidencias)

					elementosEliminar += elementosEliminarTemp

				}

				contadorConincidencias = 1
				elementosEliminarTemp = ""

			}

		}

		if (contadorConincidencias >= 3){
			//console.log("Match: fila-" + f + " - " + contadorConincidencias)

			elementosEliminar += elementosEliminarTemp
		}	

	}

	elementosEliminar = elementosEliminar.substr(0,elementosEliminar.length - 1)

	//console.log(elementosEliminar)

	return elementosEliminar;

}



function EliminarElementos(elementos){

	elementos.animate(
			    {backgroundColor: "#fff6" },
			    {queue: false,
			      duration: 1500,
			      done: function(){

			      	elementos.animate(
					    {
					      backgroundColor: "transparent"
					    },
					    {
					      queue: false,
					      duration: 1500,
					      done: function(){

			      			/// TOMO LOS ELEMENTOS PARA COLOCAR EL PUNTAJE
							incrementarPuntaje(elementos)

				      		elementos.remove()	
							
					      }

						})		      		

			      }

				})
			  

}



function chequearTablero() {

     //// BUSCAR MATCHES O COINCIDENCIAS
 	elementos = buscarCoincidencias()

	 if ($(elementos).length > 0){
		resultado = EliminarElementos($(elementos))



		setTimeout(function(){
			completarTablero()    
		},3000) 	

		return true;			
	 }else {
	 	return false;
	 }   
}



function timerChequeoTablero(){

	if (!chequearTablero()){

			if (typeof(chequeoTableroTimer) != "undefined") {clearInterval(chequeoTableroTimer)}
    		
    		$(".elemento").droppable({
			      accept: ".elemento",

			      drop: asignarDroppable
			    })

    		///ACTIVO EL BOTON DE INICIAR
    		$(".btn-reinicio").removeAttr("disabled")

    		console.log("Tablero Limpio")
    	}else {console.log("limpiando tablero")}

}


function timerGeneralPartida(){

	$("#timer").html(timerGeneral--)
	//console.log("timepo")

	if (timerGeneral <= 0){

		// FINALIZAR PARTIDA
		//console.log(typeof(generalPartidaTimer))

		clearInterval(generalPartidaTimer)
		partidaIniciada = false;


		//OCULTO EL PANEL DEL JUEGO Y MUESTRO LOS TOTALES A FULL
		$(".panel-tablero").hide("slow")

		$(".panel-score").animate(
			    {width: "100%" },
			    {queue: false,
			      duration: 1000})

	}

}


function incrementarPuntaje(elementos){

	if (partidaIniciada){


		if (ultElementos != elementos){

			Cantelementos = elementos.length

			puntajePartida += parseInt(Cantelementos) * 10;

			$("#score-text").html(puntajePartida)

			ultElementos = elementos
		}
	}

}

function incrementarMovimiento(){

	if (partidaIniciada){

		$("#movimientos-text").html(++movimientosPartida)
	}
}

function timerTituloColor(){


}






var columnaActual = 1;
var contadorElementos = 1;
var tiempoDeJuego = 120;

var timerGeneral = tiempoDeJuego;
var puntajePartida = 0;
var movimientosPartida = 0;
var partidaIniciada = false;
var ultElementos = "";
var chequeoTableroTimer ="";
var generalPartidaTimer = "";
var tituloColorTimer = "";

function init(){

	ReiniciarTablero()


	$(".elemento").droppable({
      accept: ".elemento",

      drop: asignarDroppable
    })

    chequeoTableroTimer = setInterval(timerChequeoTablero(),3000)

    tituloColorTimer = setInterval(function(){

    		var color1 = "#DCFF0E";
			var color2 = "rgb(255, 0, 0)";

			if ($(".main-titulo").css("color") == "rgb(255, 0, 0)"){
				color = color1;
			}else {color = color2}

			$(".main-titulo").animate(
					    {color: color },
					    {queue: false,
					      duration: 500})
		    },3000)

}



$(function(){

	init();


})


$(".btn-reinicio").on("click", function(){

	// CHEQUEO LA ACCION (INICIAR O REINICIAR)
	if ($(this).hasClass("iniciado")){

		//REINICIO PARTIDA
		$(this).html("Iniciar").removeClass("iniciado")


		/// REINICIO VARIABLES 
		columnaActual = 1
		puntajePartida = 0;
		movimientosPartida = 0;
		timerGeneral = tiempoDeJuego;
		partidaIniciada = false;

		// LIMPIO TABLERO
		$("div[class^='col']").empty()

		//MUESTRO TABLERO
		$(".panel-score").animate(
			    {width: "25%" },
			    {queue: false,
			      duration: 700,
			      done : function(){

			      	$(".panel-tablero").show(1000)

			      }})

		

		

		//REINICIO PANEL DE SCORES
		$("#movimientos-text,#score-text").html("0")
		$("#timer").html(timerGeneral)


		init();

	}else {

		// INICIAR PARTIDA		
		partidaIniciada = true;

		generalPartidaTimer = setInterval(function(){timerGeneralPartida()},1000)

		$(this).html("Reiniciar").addClass("iniciado")
	}




	
})


