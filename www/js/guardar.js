	console.log("ENTRO");
	var db = "";
	var nombre = "";
	var apellidos = "";
	var cargo = "";
	var email = "";
	var edad = "";
	var telefono = "";
	var poblacion = "";

	function insertarDatos(tx){
		//INSERCIÓN DE VALORES
		var sql = "INSERT INTO localDB(nombre, apellidos, cargo, email, edad, telefono, poblacion)"+ 
				  "VALUES('"+nombre+"', '"+apellidos+"', '"+cargo+"', '"+email+"', "+edad+", '"+telefono+"', '"+poblacion+"');";
		//EJECUTAMOS LA SENTENCIA SQL
		tx.executeSql(sql);
		console.log("ROW INSERT: "+sql);
	};

	function mostrarErrorGuardar(err){
        console.log("ERROR EN LA INSERCIÓN DE DATOS "+err.code);
        console.log("MENSAJE DE ERROR "+err.message);
    };

   	$("#guardar").click(function(event){
		console.log("NUEVO ELEMENTO USUARIO");
		nombre = $("#fnombre").val();
		apellidos = $("#fapellidos").val();
		cargo = $("#fcargo").val();
		email = $("#femail").val();
		edad = $("#fedad").val();
		telefono = $("#ftelefono").val();
		poblacion = $("#fpoblacion").val();

		//COMPROBACIÓN DE LOS DATOS CAPTURADOS DEL FORMULARIO
		console.log("Nombre: "+nombre);
		console.log("Apellidos: "+apellidos);
		console.log("Cargo: "+cargo);
		console.log("Email: "+email);
		console.log("Edad: "+edad);
		console.log("Telefono: "+telefono);
		console.log("Poblacion: "+poblacion);

		//CONEXIÓN CON BBDD
		db = window.openDatabase("localDB", "1.0", "Base de datos de prueba", 2*1024*1024);
		//TRANSACCIÓN
		db.transaction(insertarDatos, mostrarErrorGuardar);
		console.log("INSERCIÓN DE USUARIO REALIZADA CON ÉXITO");	
	});	

	function mostrarImagen(imageURI){
	    console.log("IMAGEN URI: "+imageURI);
	    $("#perfil").attr("src", imageURI);
  	};

  	function errorImagen(message){
    	consoles.log("ERROR CON LA IMAGEN "+message);
 	};

  	$("#perfil").click(function(event){
        navigator.camera.getPicture(mostrarImagen,errorImagen, { quality:100, targetWidth:250, targetHeight:250,
        destinationType: Camera.DestinationType.FILE_URI });
    });

    