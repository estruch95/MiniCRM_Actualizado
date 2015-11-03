/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var cargarDB = {
    db: "",
    initialize: function(){
        //GENERAMOS LA BBDD
        this.db = window.openDatabase("localDB", "1.0", "Base de datos de prueba", 2*1024*1024);
        this.cargarDB();
    },

    cargarDB: function(){
        console.log("CARGAMOS LA BBDD YA EXISTENTE");
        //Transacción
        this.db.transaction(this.mostrarDB, this.mostrarDBError);
    },

    mostrarDB: function(tx){
        var sql = "SELECT * FROM localDB;";
        console.log("LANZAMOS LA CONSULTA SQL PARA CARGAR LA TABLA CORRESPONDIENTE");
        tx.executeSql(
            sql,
            [], 
            //Función de resultado OK
            function(tx, result){
                console.log("CONSULTA REALIZADA CON EXITO, RECUPERANDO DATOS");
                if(result.rows.length>0){
                    for(var i=0; i<result.rows.length; i++){
                        var fila = result.rows.item(i);
                        //Aquí actualizaría mi html automáticamente para cargar datos de la BBDD
                        console.log("ROW "+i+" nombre: "+fila.nombre);
                        //REVISAR LA RECUPERACIÓN DE DATOS (ALGO FALLA)
                        //c"<li><a href='./alumnos/ivan.html'><img src='./img/usuario'+i'.png' class='imagenLista'><div class='nombreLista'>"+fila.nombre+"</div><div class='profesionLista'>"+fila.cargo+"</div></a></li>").listview('refresh');
                        //$("#listaContactos li").append("<li><a href='./alumnos/joaquin.html'><img src='./img/usuario2.png' class='imagenLista'><div class='nombreLista'>"+fila.nombre+"</div><div class='profesionLista'>Alumno</div></a></li>");
                        $("#listaContactos ul").append("<li>"+i+"</li>").listview('refresh');
                    }
                    console.log("LLEGO");
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

var confDB = {
    //Propiedades
    existe_db: "",
    db: "",
    //Método inicializador (constructor)
    initialize: function(){
        //Declaración de variables
        this.existe_db = window.localStorage.getItem("existe_db");
        //Creamos un enlace con la base de datos
        //Abrir base de datos
        this.db = window.openDatabase("localDB", "1.0", "Base de datos de prueba", 2*1024*1024);
        //Comprobación de si es necesario crear la base de datos
        if (this.existe_db == null || this.existe_db == false){
            //En caso de no existir la bd, esta ventana permitirá poder crearla.
            console.log("NO EXISTE LA BBDD");
            this.createDB();
        }
        else{
            console.log("LA BBDD NO EXISTE, SE PROCEDE A CARGAR");
            cargarDB.initialize();
        }     
    },
   
    createDB: function(){
        console.log("CREAMOS LA BBDD");
        //Transacción
        this.db.transaction(this.createLocalDB, this.createDBError, this.createDBSucc);
    },

    createLocalDB: function(tx){
        var sql = "CREATE TABLE IF NOT EXISTS localDB ("+
                  "id           INTEGER         primary key autoincrement,"+
                  "nombre       VARCHAR(50)     not null,"+
                  "apellidos    VARCHAR(250)    not null,"+
                  "cargo        VARCHAR(250)    not null,"+
                  "email        VARCHAR(250)    not null );"
            ;
            tx.executeSql(sql);
            console.log("TABLA CREADA CORRECTAMENTE");

            //Inserción de datos en la tabla creada anteriormente
            sql = "INSERT INTO localDB(id, nombre, apellidos, cargo, email)"+
                  "VALUES(1, 'Ivan', 'Estruch', 'Alumno', 'estruch95.b@gmail.com')";
            tx.executeSql(sql);

            sql = "INSERT INTO localDB(id, nombre, apellidos, cargo, email)"+
                  "VALUES(2, 'Joaquin', 'Bahamonde', 'Alumno', 'joaco17@gmail.com')";
            tx.executeSql(sql);

            sql = "INSERT INTO localDB(id, nombre, apellidos, cargo, email)"+
                  "VALUES(3, 'Jose', 'Igualada', 'Alumno', 'igualada94@hotmail.com')";
            tx.executeSql(sql);

            sql = "INSERT INTO localDB(id, nombre, apellidos, cargo, email)"+
                  "VALUES(4, 'Adrian', 'Rodriguez', 'Alumno', 'rodri@hotmail.es')";
            tx.executeSql(sql);

            sql = "INSERT INTO localDB(id, nombre, apellidos, cargo, email)"+
                  "VALUES(5, 'Silvia', 'Reolid', 'Alumno', 'silreolid@gmail.es')";
            tx.executeSql(sql);
            console.log("INSERCION DE DATOS REALIZADA CORRECTAMENTE");
    },

    createDBError: function(err){
        console.log("ERROR DE CREACION DE BBDD"+err.code);
    },

    createDBSucc: function(){
        console.log("BBDD GENERADA EXITOSAMENTE");
        window.localStorage.setItem("existe_db",1);
    }
};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        */
        console.log('Received Event: ' + id);

        //Inicializado de comprobación de existencia de DB
        confDB.initialize();
    }
};
