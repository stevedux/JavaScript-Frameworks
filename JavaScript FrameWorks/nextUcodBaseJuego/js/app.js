var columnaActual = 0;



///	CREAR ELEMENTO
function CrearElemento(x,y){

	var nro = Math.floor(Math.random() * 5);
	var idEle = "elemento_" + x + "_" + y;

	//CORRECCION 
	if (nro == 0 || nro > 4){nro = 1}

	var elemento = "<img src='image\\" + nro + ".png' class='elemento' id='" + idEle + "'>"

	return elemento;
}


function ReiniciarTablero(){

	columnaActual++

	if (columnaActual <= 7){ 

		// RELLENO EL TABLERO
		for (var y = 1; y < 8; y++) {

			$(".col-" + columnaActual).append(CrearElemento(columnaActual,y))

		}		


		$(".elemento").animate({top: "0px"},1000,function(){
			setTimeout(function() {
				ReiniciarTablero();
			},500);
				
		}) 

	}else {
		//columnaActual = 0;
	}
}


function CompletarColumna(columna){

	// CUENTO LOS ITEMS FALTANTES
	var faltantes = 7 - $(".col-" + columna + " .elemento").length

	console.log(faltantes)

}


function init(){

	ReiniciarTablero()

}

$(function(){

	init();


	$(".btn-reinicio").on("click", function(){
		columnaActual = 0

		$("div[class^='col']").empty()

		ReiniciarTablero()
	})



	$(".elemento").on("click", function(){

		console.log($(this))

		col = $(this).attr("id")
		col = col.substring(9, 1);

		$(this).remove()

		CompletarColumna(col)

	})

})


