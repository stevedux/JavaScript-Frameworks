<?php 


  function getData(){
    $data_file = fopen("data-1.json","r");
    $data_readed = fread($data_file, filesize("data-1.json"));
    $data = json_decode($data_readed, true);
    fclose($data_file);
    return $data;
  }



  function getCiudades($data){

  	$ciudades = array();
  	$resultado  = "";

  	foreach ($data as $key => $value) {
  		$ciudades[] = $value["Ciudad"];
  	}

  	$ciudades = array_unique($ciudades);

  	// CREO LA LISTA DE CIUDADES
  	foreach ($ciudades as $key => $value) {
		$resultado .= "<option value='$value'>$value</option>\n";
  	}

  	return $resultado;

  }

function getTipos($data){

  	$tipos = array();
  	$resultado  = "";

  	foreach ($data as $key => $value) {
  		$tipos[] = $value["Tipo"];
  	}

  	$tipos = array_unique($tipos);
  	
  	// CREO LA LISTA DE TIPOS
  	foreach ($tipos as $key => $value) {
		$resultado .= "<option value='$value'>$value</option>\n";
  	}

  	return $resultado;

 }


 function getInmuebles($filtroTipo,$filtroCiudad,$filtroPrecioMin,$filtroPrecioMax,$mostrarTodos,$data){

 	$resultado = "";
 	$filtroPrecioMax = intval($filtroPrecioMax);
 	$filtroPrecioMin = intval($filtroPrecioMin);

 	foreach ($data as $key => $value) {

 		// TOMO EL PRECIO
 		$precio = str_replace("$", "", $value["Precio"]);
 		$precio = intval(str_replace(",", "", $precio));

 		//  CHEQUEO EL FILTRADO POR TIPO O CIUDAD
 		if ($filtroCiudad != $value["Ciudad"] && $filtroCiudad != ""){
 			continue;
 		}

 		if ($filtroTipo != $value["Tipo"] && $filtroTipo != ""){
 			continue;
 		}



 		if ($precio >= $filtroPrecioMin && $precio <= $filtroPrecioMax || $mostrarTodos == "true" ){

 			$resultado .= "<div class='itemMostrado '>          
				          <img src='img/home.jpg'>

				          <p class='card-stacked'>
				            <strong>Direccion: </strong>" . $value["Direccion"] . "<br>
				            <strong>Ciudad: </strong>" . $value["Ciudad"] . "<br>
				            <strong>Telefono: </strong>" . $value["Telefono"] . "<br>
				            <strong>Codigo Postal: </strong>" . $value["Codigo_Postal"] . "<br>
				            <strong>Tipo: </strong>" . $value["Tipo"] . "<br>
				            <strong>Precio: </strong><span class='precioTexto'>" . $value["Precio"] . "</span><br>
				          </p>

				        </div>\n";

		}

 	}


    return $resultado;

 }



?>