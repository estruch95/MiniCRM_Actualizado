var guardar = {

	var db = "";
	var nombre = "";
	var apellidos = "";
	var cargo = "";
	var email = "";
	var edad = "";
	var telefono = "";

	insertarDatos: function(tx){
		//INSERCIÓN DE VALORES
		var sql = "INSERT INTO localDB(nombre, apellidos, cargo, email, edad, telefono) VALUES(
		'"+nombre+"', '"+apellidos+"', '"+cargo+"', '"+email+"', "+edad+", '"+telefono+"');";
		//EJECUTAMOS LA SENTENCIA SQL
		tx.executeSql(sql);
		console.log("ROW INSERT: "+sql);
	},

	mostrarErrorGuardar: function(err){
        console.log("ERROR EN LA INSERCIÓN DE DATOS "+err.code);
        console.log("MENSAJE DE ERROR "+err.message);
    },

	$("#guardar").click(
			function(event){
				console.log("NUEVO ELEMENTO USUARIO");
				nombre = $("#nombre").val();
				apellidos = $("#apellidos").val();
				cargo = $("#cargo").val();
				email = $("#email").val();
				edad = $("#edad").val();
				telefono = $("#telefono").val();

				//CONEXIÓN CON BBDD
				this.db = window.openDatabase("localDB", "1.0", "Base de datos de prueba", 2*1024*1024);
				//TRANSACCIÓN
				this.db.transaction(this.insertarDatos, this.mostrarErrorGuardar);
			}
	);

};