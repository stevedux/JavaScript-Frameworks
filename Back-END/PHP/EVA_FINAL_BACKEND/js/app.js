$(function(){

	$('select').material_select();
	$("#submitButton,#mostrarTodos").click(submitBusqueda);



})



function submitBusqueda(event){
  event.preventDefault();

  /// SI FUE PRESIONADO EL BOTON DE MOSTRAR TODOS O NO
  botonOrigen = event.target.id
  if (botonOrigen == "mostrarTodos"){var mostrarTodos = "true"} else {var mostrarTodos = "false"}

  var ciudad = $('#selectCiudad').val();
  var tipo = $('#selectTipo').val();
  var precio = $('#rangoPrecio').val();

  var form_data = new FormData();
  form_data.append('ciudad', ciudad);
  form_data.append('tipo', tipo);
  form_data.append('precio', precio);
  form_data.append('mostrarTodos', mostrarTodos);



  $.ajax({
    url: 'buscador.php',
    dataType: "text",
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: 'post',


    beforeSend: function(){
    	$("#resultadosBusqueda").fadeOut();
    },

    success: function(data){

    	$("#resultadosBusqueda").html(data);

    	setTimeout(function() {
			$("#resultadosBusqueda").fadeIn();
    	}, 500);
    	
    },


    error: function(){
      alert("error al enviar los datos");
    }
  });
}



