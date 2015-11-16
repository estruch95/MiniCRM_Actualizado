var guardar = {

	db:"",
	nombre:"",
	apellidos:"",
	cargo:"",
	email:"",
	edad:"",
	telefono:"",
	poblacion:"",

	insertarDatos: function(tx){
		//INSERCIÓN DE VALORES
		var sql = "INSERT INTO localDB VALUES('"+nombre+"', '"+apellidos+"', '"+cargo+"', '"+email+"', "+edad+", '"+telefono+"', '"+poblacion+"');";
		//EJECUTAMOS LA SENTENCIA SQL
		tx.executeSql(sql);
		console.log("ROW INSERT: "+sql);
	},

	mostrarErrorGuardar: function(err){
        console.log("ERROR EN LA INSERCIÓN DE DATOS "+err.code);
        console.log("MENSAJE DE ERROR "+err.message);
    },

    guardarUsuario: function(){
    	$("#guardar").click(
			function(event){
				console.log("NUEVO ELEMENTO USUARIO");
				this.nombre = $("#nombre").val();
				this.apellidos = $("#apellidos").val();
				this.cargo = $("#cargo").val();
				this.email = $("#email").val();
				this.edad = $("#edad").val();
				this.telefono = $("#telefono").val();
				this.poblacion = $("#poblacion").val();

				//CONEXIÓN CON BBDD
				this.db = window.openDatabase("localDB", "1.0", "Base de datos de prueba", 2*1024*1024);
				//TRANSACCIÓN
				this.db.transaction(this.insertarDatos, this.mostrarErrorGuardar);
			}
		);
    }	
};