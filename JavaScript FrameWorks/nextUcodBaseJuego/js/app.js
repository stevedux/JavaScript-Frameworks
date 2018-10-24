var columnaActual = 1;



///	CREAR ELEMENTO
function CrearElemento(col,fila){

	var nro = Math.floor(Math.random() * 5);
	//var idEle = "elemento_" + x + "_" + y;

	//CORRECCION 
	if (nro == 0 || nro > 4){nro = 1}

	var elemento = "<img src='image\\" + nro + ".png' class='elemento' tipo='" + nro + "' col='" + col + "'>"

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
	$(".elemento").draggable()



}


function Animar(){	

	if (columnaActual <= 7){

		$(".col-" + columnaActual + " .elemento").animate({top: "0px"},500,function(){
			setTimeout(function() {
				columnaActual++
				Animar();
			},500);
				
		}) 
	}
}

function EliminarElemento(){

	//console.log($(this))

	col = $(this).attr("col")

	$(this).fadeOut(function(){
		$(this).remove(
			CompletarColumna(col)
			)})
	
	
}


function CompletarColumna(columna){

	// CUENTO LOS ITEMS FALTANTES
	var faltantes = 8 - $(".col-" + columna + " .elemento").length

	console.log("falt:"+ faltantes)

}


function init(){

	ReiniciarTablero()

}

$(function(){

	init();


	$(".btn-reinicio").on("click", function(){
		columnaActual = 1

		$("div[class^='col']").empty()

		ReiniciarTablero()
	})

	$(".elemento").droppable({
      accept: ".elemento",

      drop: function(event, ui){


      	origen = ui.draggable
      	destino = $(this)

      	//$(destino,origen).css({top: "0", left: "0"})

      	//destino.before(origen)



        

        //alert("Correcto!")
      }
    })








})


