//funciones concentracion


$(document).ready(function() {
    $('#datatable1').DataTable();
    $('#datatable2').DataTable();
    $('#datatable3').DataTable();
    $('#datatable4').DataTable();
});


async function cargaDosis() {
    const response = await fetch(`/buscar_dos`);
    const opcionesTabla = await response.json();

    // Inicializar DataTable con textos en español y ordenación por la columna de ID en orden descendente
    const table = new DataTable('#datatable1', {
        order: [[0, 'desc']], // Ordenar por la primera columna (ID) en orden descendente
        destroy: true, // Asegura que la tabla pueda ser reinicializada
        language: {
            "decimal": "",
            "emptyTable": "No hay datos disponibles en la tabla",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
            "infoFiltered": "(filtrado de _MAX_ entradas totales)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron coincidencias",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": activar para ordenar la columna ascendente",
                "sortDescending": ": activar para ordenar la columna descendente"
            }
        },
        columnDefs: [
            { className: "dt-center", targets: "_all" } // Aplicar la clase dt-center a todas las columnas
        ]
    });

    // Obtener el cuerpo de la tabla
    const tbody = document.getElementById('datatable1').querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar el contenido previo de la tabla

    // Agregar los datos a la tabla usando la API de DataTable
    opcionesTabla.forEach(item => {
        table.row.add([
            item.id_dosis,
            item.nombre,
            item.alta,
            `<button onclick="buscarDos(${item.id_dosis})" class="btn btn-primary btn-sm" >modificar </button>`,
            `<a href="/borrar_dos/${item.id_dosis}" class="btn btn-danger btn-sm" type="button">Eliminar</a>`
        ]).draw(false);


    });
}

// Llamar a la función para cargar los datos
cargaDosis();


//activar modal para modificar concentracion
async function buscarDos(id) {
    // Abre el modal
    const modal = new bootstrap.Modal(document.getElementById('dosModal'));
    modal.show();

    const response = await fetch(`/buscarDos/${id}`);
    const { data } = await response.json(); // Desestructurando data del objeto JSON

    // Inyectar datos en los campos del formulario del modal

    document.getElementById('dosisEdit').value = data[0].nombre;
 
    // Suponiendo que obtienes data[0].id_pas de algún lugar
    const idDosis = data[0].id_dosis;

    // Obtener el formulario
    const formulario = document.getElementById('dosisActualizar');

    // Modificar el action del formulario
    formulario.action = `/updateDos/${idDosis}`;

}
$(document).ready(function() {
    $('#datatable5').DataTable();
    $('#datatable6').DataTable();
    $('#datatable7').DataTable();
    $('#datatable8').DataTable();
});
async function cargaDosis0() {
   // Abre el modal
   const modal = new bootstrap.Modal(document.getElementById('dosAltaModal'));
   modal.show();

    const response = await fetch(`/buscar_dos0`);
    const opcionesTabla = await response.json();

    // Inicializar DataTable con textos en español y ordenación por la columna de ID en orden descendente
    const table = new DataTable('#datatable5', {
        order: [[0, 'desc']], // Ordenar por la primera columna (ID) en orden descendente
        destroy: true, // Asegura que la tabla pueda ser reinicializada
        language: {
            "decimal": "",
            "emptyTable": "No hay datos disponibles en la tabla",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
            "infoFiltered": "(filtrado de _MAX_ entradas totales)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron coincidencias",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": activar para ordenar la columna ascendente",
                "sortDescending": ": activar para ordenar la columna descendente"
            }
        },
        columnDefs: [
            { className: "dt-center", targets: "_all" } // Aplicar la clase dt-center a todas las columnas
        ]
    });

    // Obtener el cuerpo de la tabla
    const tbody = document.getElementById('datatable5').querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar el contenido previo de la tabla

    // Agregar los datos a la tabla usando la API de DataTable
    opcionesTabla.forEach(item => {
        table.row.add([
            item.id_dosis,
            item.nombre,
            item.alta,
           `<a href="/altaDos/${item.id_dosis}" class="btn btn-primary btn-sm" type="button">Dar Alta</a>`,
        ]).draw(false);


    });
}

/////////////////////////////////////////////////
//funciones frecuencia

async function cargarFrec() {
    const response = await fetch(`/buscar_frec`);
    const opcionesTabla = await response.json();

    // Inicializar DataTable con textos en español y ordenación por la columna de ID en orden descendente
    const table = new DataTable('#datatable2', {
        order: [[0, 'desc']], // Ordenar por la primera columna (ID) en orden descendente
        destroy: true, // Asegura que la tabla pueda ser reinicializada
        language: {
            "decimal": "",
            "emptyTable": "No hay datos disponibles en la tabla",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
            "infoFiltered": "(filtrado de _MAX_ entradas totales)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron coincidencias",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": activar para ordenar la columna ascendente",
                "sortDescending": ": activar para ordenar la columna descendente"
            }
        },
        columnDefs: [
            { className: "dt-center", targets: "_all" } // Aplicar la clase dt-center a todas las columnas
        ]
    });

    // Obtener el cuerpo de la tabla
    const tbody = document.getElementById('datatable2').querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar el contenido previo de la tabla

    // Agregar los datos a la tabla usando la API de DataTable
    opcionesTabla.forEach(item => {
        table.row.add([
            item.id_frecuencia,
            item.nombre,
            item.alta,
            `<button onclick="buscarFrec(${item.id_frecuencia})" class="btn btn-primary btn-sm" >modificar </button>`,
            `<a href="/borrar_frec/${item.id_frecuencia}" class="btn btn-danger btn-sm" type="button">Eliminar</a>`
        ]).draw(false);


    });
}

// Llamar a la función para cargar los datos
cargarFrec();


//activar modal para modificar concentracion
async function buscarFrec(id) {
    // Abre el modal
    const modal = new bootstrap.Modal(document.getElementById('frecModal'));
    modal.show();

    const response = await fetch(`/buscarFrec/${id}`);
    const { data } = await response.json(); // Desestructurando data del objeto JSON

    // Inyectar datos en los campos del formulario del modal

    document.getElementById('frecuenciaEdit').value = data[0].nombre;
 
    // Suponiendo que obtienes data[0].id_pas de algún lugar
    const idFrec = data[0].id_frecuencia;

    // Obtener el formulario
    const formulario = document.getElementById('frecActualizar');

    // Modificar el action del formulario
    formulario.action = `/updateFrec/${idFrec}`;

}

async function cargaFrec0() {
   // Abre el modal
   const modal = new bootstrap.Modal(document.getElementById('frecAltaModal'));
   modal.show();

    const response = await fetch(`/buscar_frec0`);
    const opcionesTabla = await response.json();

    // Inicializar DataTable con textos en español y ordenación por la columna de ID en orden descendente
    const table = new DataTable('#datatable6', {
        order: [[0, 'desc']], // Ordenar por la primera columna (ID) en orden descendente
        destroy: true, // Asegura que la tabla pueda ser reinicializada
        language: {
            "decimal": "",
            "emptyTable": "No hay datos disponibles en la tabla",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
            "infoFiltered": "(filtrado de _MAX_ entradas totales)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron coincidencias",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": activar para ordenar la columna ascendente",
                "sortDescending": ": activar para ordenar la columna descendente"
            }
        },
        columnDefs: [
            { className: "dt-center", targets: "_all" } // Aplicar la clase dt-center a todas las columnas
        ]
    });

    // Obtener el cuerpo de la tabla
    const tbody = document.getElementById('datatable6').querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar el contenido previo de la tabla

    // Agregar los datos a la tabla usando la API de DataTable
    opcionesTabla.forEach(item => {
        table.row.add([
            item.id_frecuencia,
            item.nombre,
            item.alta,
           `<a href="/altaFrec/${item.id_frecuencia}" class="btn btn-primary btn-sm" type="button">Dar Alta</a>`,
        ]).draw(false);


    });
}

/////////////////////////////////////////////////
//funciones Duracion

async function cargarDuracion() {
    const response = await fetch(`/buscar_dura`);
    const opcionesTabla = await response.json();

    // Inicializar DataTable con textos en español y ordenación por la columna de ID en orden descendente
    const table = new DataTable('#datatable3', {
        order: [[0, 'desc']], // Ordenar por la primera columna (ID) en orden descendente
        destroy: true, // Asegura que la tabla pueda ser reinicializada
        language: {
            "decimal": "",
            "emptyTable": "No hay datos disponibles en la tabla",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
            "infoFiltered": "(filtrado de _MAX_ entradas totales)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron coincidencias",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": activar para ordenar la columna ascendente",
                "sortDescending": ": activar para ordenar la columna descendente"
            }
        },
        columnDefs: [
            { className: "dt-center", targets: "_all" } // Aplicar la clase dt-center a todas las columnas
        ]
    });

    // Obtener el cuerpo de la tabla
    const tbody = document.getElementById('datatable3').querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar el contenido previo de la tabla

    // Agregar los datos a la tabla usando la API de DataTable
    opcionesTabla.forEach(item => {
        table.row.add([
            item.id_duracion,
            item.nombre,
            item.alta,
            `<button onclick="buscarDura(${item.id_duracion})" class="btn btn-primary btn-sm" >modificar </button>`,
            `<a href="/borrar_dura/${item.id_duracion}" class="btn btn-danger btn-sm" type="button">Eliminar</a>`
        ]).draw(false);

    

    });
}

// Llamar a la función para cargar los datos
cargarDuracion()

//activar modal para modificar concentracion
async function buscarDura(id) {
    // Abre el modal
    const modal = new bootstrap.Modal(document.getElementById('duraModal'));
    modal.show();

    const response = await fetch(`/buscarDura/${id}`);
    const { data } = await response.json(); // Desestructurando data del objeto JSON

    // Inyectar datos en los campos del formulario del modal

    document.getElementById('duraEdit').value = data[0].nombre;
 
    // Suponiendo que obtienes data[0].id_pas de algún lugar
    const idDura = data[0].id_duracion;

    // Obtener el formulario
    const formulario = document.getElementById('duraActualizar');

    // Modificar el action del formulario
    formulario.action = `/updateDura/${idDura}`;

}

async function cargaDura0() {
   // Abre el modal
   const modal = new bootstrap.Modal(document.getElementById('duraAltaModal'));
   modal.show();

    const response = await fetch(`/buscar_dura0`);
    const opcionesTabla = await response.json();

    // Inicializar DataTable con textos en español y ordenación por la columna de ID en orden descendente
    const table = new DataTable('#datatable7', {
        order: [[0, 'desc']], // Ordenar por la primera columna (ID) en orden descendente
        destroy: true, // Asegura que la tabla pueda ser reinicializada
        language: {
            "decimal": "",
            "emptyTable": "No hay datos disponibles en la tabla",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
            "infoFiltered": "(filtrado de _MAX_ entradas totales)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron coincidencias",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": activar para ordenar la columna ascendente",
                "sortDescending": ": activar para ordenar la columna descendente"
            }
        },
        columnDefs: [
            { className: "dt-center", targets: "_all" } // Aplicar la clase dt-center a todas las columnas
        ]
    });

    // Obtener el cuerpo de la tabla
    const tbody = document.getElementById('datatable7').querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar el contenido previo de la tabla

    // Agregar los datos a la tabla usando la API de DataTable
    opcionesTabla.forEach(item => {
        table.row.add([
            item.id_duracion,
            item.nombre,
            item.alta,
           `<a href="/altaDura/${item.id_duracion}" class="btn btn-primary btn-sm" type="button">Dar Alta</a>`,
        ]).draw(false);


    });
}
/////////////////////////////////////////////////
//funciones Cantidad

async function cargarCantidad() {
    const response = await fetch(`/buscar_cant`);
    const opcionesTabla = await response.json();

    // Inicializar DataTable con textos en español y ordenación por la columna de ID en orden descendente
    const table = new DataTable('#datatable4', {
        order: [[0, 'desc']], // Ordenar por la primera columna (ID) en orden descendente
        destroy: true, // Asegura que la tabla pueda ser reinicializada
        language: {
            "decimal": "",
            "emptyTable": "No hay datos disponibles en la tabla",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
            "infoFiltered": "(filtrado de _MAX_ entradas totales)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron coincidencias",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": activar para ordenar la columna ascendente",
                "sortDescending": ": activar para ordenar la columna descendente"
            }
        },
        columnDefs: [
            { className: "dt-center", targets: "_all" } // Aplicar la clase dt-center a todas las columnas
        ]
    });

    // Obtener el cuerpo de la tabla
    const tbody = document.getElementById('datatable4').querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar el contenido previo de la tabla

    // Agregar los datos a la tabla usando la API de DataTable
    opcionesTabla.forEach(item => {
        table.row.add([
            item.id_cantidad,
            item.nombre,
            item.alta,
            `<button onclick="buscarCant(${item.id_cantidad})" class="btn btn-primary btn-sm" >modificar </button>`,
            `<a href="/borrar_cant/${item.id_cantidad}" class="btn btn-danger btn-sm" type="button">Eliminar</a>`
        ]).draw(false);


    });
}

// Llamar a la función para cargar los datos
cargarCantidad()

//activar modal para modificar concentracion
async function buscarCant(id) {
    // Abre el modal
    const modal = new bootstrap.Modal(document.getElementById('cantModal'));
    modal.show();

    const response = await fetch(`/buscarCant/${id}`);
    const { data } = await response.json(); // Desestructurando data del objeto JSON

    // Inyectar datos en los campos del formulario del modal

    document.getElementById('cantEdit').value = data[0].nombre;
 
    // Suponiendo que obtienes data[0].id_pas de algún lugar
    const idCant = data[0].id_cantidad;

    // Obtener el formulario
    const formulario = document.getElementById('cantActualizar');

    // Modificar el action del formulario
    formulario.action = `/updateCant/${idCant}`;

}

async function cargaCant0() {
   // Abre el modal
   const modal = new bootstrap.Modal(document.getElementById('cantAltaModal'));
   modal.show();

    const response = await fetch(`/buscar_cant0`);
    const opcionesTabla = await response.json();

    // Inicializar DataTable con textos en español y ordenación por la columna de ID en orden descendente
    const table = new DataTable('#datatable8', {
        order: [[0, 'desc']], // Ordenar por la primera columna (ID) en orden descendente
        destroy: true, // Asegura que la tabla pueda ser reinicializada
        language: {
            "decimal": "",
            "emptyTable": "No hay datos disponibles en la tabla",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
            "infoFiltered": "(filtrado de _MAX_ entradas totales)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron coincidencias",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": activar para ordenar la columna ascendente",
                "sortDescending": ": activar para ordenar la columna descendente"
            }
        },
        columnDefs: [
            { className: "dt-center", targets: "_all" } // Aplicar la clase dt-center a todas las columnas
        ]
    });

    // Obtener el cuerpo de la tabla
    const tbody = document.getElementById('datatable8').querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar el contenido previo de la tabla

    // Agregar los datos a la tabla usando la API de DataTable
    opcionesTabla.forEach(item => {
        table.row.add([
            item.id_cantidad,
            item.nombre,
            item.alta,
           `<a href="/altaCant/${item.id_cantidad}" class="btn btn-primary btn-sm" type="button">Dar Alta</a>`,
        ]).draw(false);


    });
}