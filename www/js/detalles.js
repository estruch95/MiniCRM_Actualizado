var cargarDetalles = {
    db: "",
    initialize: function(){
        //GENERAMOS LA BBDD
        this.db = window.openDatabase("localDB", "1.0", "Base de datos de prueba", 2*1024*1024);
        this.cargarDB();
    },

    cargarDB: function(){
        console.log("CARGAMOS LA BBDD YA EXISTENTE");
        //Transacción
        this.db.transaction(this.cargarDetalles, this.mostrarDBError);
    },

    cargarDetalles: function(tx){
        var sql = "SELECT * FROM localDB WHERE nombre = 'Ivan';";
        console.log("LANZAMOS LA CONSULTA SQL DE DETALLES");
        tx.executeSql(
            sql,
            [], 
            //Función de resultado OK
            function(tx, result){
                console.log("CONSULTA DE DETALLES REALIZADA CON EXITO, RECUPERANDO DATOS");
                if(result.rows.length>0){
                    for(var e=0; e<result.rows.length; e++){
                        var fila = result.rows.item(e);
                        //Aquí actualizaría mi html automáticamente para cargar datos de la BBDD
                        console.log("ITERAMOS DETALLES");
                        //RECUPERACIÓN DE DATOS
                        $("#listaDetalles ul").append(
                            "<li><img src='../img/user.png' class='imagen'>"+
                                "<div class='nombre'><b>"+fila.nombre+"</b></div>"+
                                "<div class='profesion'>"+fila.cargo+"</div>"+
                                "<div class='poblacion'>"+fila.poblacion+"</div>"+
                                "<div class='edad'>"+fila.edad+"</div>"+
                            "</li>"+
                              
                              "<li><div><b>Uso de herramientas TIC</b></div><div class='herramientasTic'>Usa Gmail, drive...</div></li>"+
                              
                              "<li><img src='../img/correo.jpeg' align='right' class='imagenCorreo'><div><b>Correo</b></div><div class='correo'>"+fila.email+"</div></li>"+
                              
                              "<li><img src='../img/telf.png' align='right' class='imagenTelf'><div><b>Telefono</b></div><div class='telefono'>"+fila.telefono+"</div></li>").listview('refresh');
                    }
                }
            },
            //Función de error
            function(tx, error){
                this.mostrarDBError(error);
            }
        );
    },

    mostrarDBError: function(err){
        console.log("ERROR DE CARGA DE BBDD "+err.code);
        console.log("MENSAJE DE ERROR "+err.message);
    }

};