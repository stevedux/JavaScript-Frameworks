<?php 

require 'funciones.php';


// CARGO LOS DATOS	
$datos = getData();

// TOMO LOS DATOS DE RANGO DE PRECIOS
$rangoPrecios = explode(";", $_POST["precio"]);
$filtroPrecioMin = $rangoPrecios[0];
$filtroPrecioMax = $rangoPrecios[1];


// getInmuebles($filtroTipo,$filtroCiudad,$filtroPrecioMin,$filtroPrecioMax,$data)
echo getInmuebles($_POST["tipo"],$_POST["ciudad"],$filtroPrecioMin,$filtroPrecioMax,$_POST["mostrarTodos"],$datos);



?>