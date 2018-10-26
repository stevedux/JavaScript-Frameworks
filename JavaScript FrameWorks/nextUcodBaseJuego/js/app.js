

///	CREAR ELEMENTO
function CrearElemento(col,fila){

	//var nro = Math.floor(Math.random() * 5);
	//var idEle = "elemento_" + x + "_" + y;

	//CORRECCION 
	//if (nro == 0 || nro > 4){nro = 1}

	do {
		var nro = Math.floor(Math.random() * 5);
	}
	while (nro == 0 || nro > 4);


	var elemento = "<img src='image\\" + nro + ".png' class='elemento' tipo='" + nro 
		+ "' col='" + col + "' fila='" + fila + "' id='" + contadorElementos++ +"'>"

	return elemento;
}


function ReiniciarTablero(){

	for (var col = 0; col < 8; col++) {

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

/*function EliminarElemento(){

	//console.log($(this))

	col = $(this).attr("col")

	$(this).fadeOut(function(){
		$(this).remove(
			CompletarColumna(col)
			)})
	
	
}*/


function CompletarColumna(columna){

	// CUENTO LOS ITEMS FALTANTES
	var faltantes = 8 - $(".col-" + columna + " .elemento").length

	console.log("falt:"+ faltantes)

}


/*function cambiarElemento(){


	$(".col-1 .elemento")[0].after($(".col-1 .elemento")[6])
}*/


function asignarDroppable(event, ui){

      	origen = ui.draggable
      	destino = $(this)

      	origTemp = ui.draggable.clone()
      	destTemp = $(this).clone()


      	//$(destino,origen).css({top: "0", left: "0"})

      	/*console.log($(origen).attr("fila") + " : " + $(origen).attr("col")) 
      	console.log("<=====>")
      	console.log($(destino).attr("fila") + " : " + $(destino).attr("col")) 

      	fo = $(origen).attr("fila") - 1
      	fd = $(destino).attr("fila") - 1*/

                   
         //$(".col-" + $(origen).attr("col") + " .elemento")[fo].after($(".col-" + $(destino).attr("col") + " .elemento")[fd])           
      
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

}


function buscarCoincidencias(){

	var elementosCol = []


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

			}else{

				if (contadorConincidencias >= 3){
					console.log("Match: col-" + c + " - " + contadorConincidencias)
				}

				contadorConincidencias = 1

			}

		}

		if (contadorConincidencias >= 3){
			console.log("Match: col-" + c + " - " + contadorConincidencias)
		}		

	}


	///// BUSQUEDA HORIZONTAL ////
	for (var f = 0; f < 6; f++) {

		contadorConincidencias = 1

		//console.log("===> Fila: " + f)

		for (var c = 1; c < 7; c++) {
			
			var Comparar = $(elementosCol[c][f]).attr("tipo")
			var CompararCon = $(elementosCol[c+1][f]).attr("tipo") 

			//console.log(Comparar + " == " + CompararCon)

			if (Comparar == CompararCon){
				contadorConincidencias++

			}else{

				if (contadorConincidencias >= 3){
					console.log("Match: fila-" + f + " - " + contadorConincidencias)
				}

				contadorConincidencias = 1

			}

		}

		if (contadorConincidencias >= 3){
			console.log("Match: fila-" + f + " - " + contadorConincidencias)
		}	



	}




}















var columnaActual = 1;
var contadorElementos = 1;

function init(){

	ReiniciarTablero()




	$(".elemento").droppable({
      accept: ".elemento",

      drop: asignarDroppable
    })

     buscarCoincidencias()



}

$(function(){

	init();


})


	$(".btn-reinicio").on("click", function(){
		columnaActual = 1

		$("div[class^='col']").empty()

		init();
	})


