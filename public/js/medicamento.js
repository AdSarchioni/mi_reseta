async function cargarMed() {
    const response = await fetch(`/medicamentos`);
    const opcionesTabla = await response.json();

    // Inicializar DataTable con textos en español y ordenación por la columna de ID en orden descendente
    const table = new DataTable('#myTable', {
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
    const tbody = document.getElementById('myTable').querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar el contenido previo de la tabla

    // Agregar los datos a la tabla usando la API de DataTable
    opcionesTabla.forEach(item => {
        table.row.add([
            item.id,
            item.id_reg_nac,
            item.nombre_generico,
            item.nombre,
            item.alta_med,
            item.concentracion,
            item.forma_farma,
            item.familia,
            item.presentacion,
            `<button onclick="buscarPas(${item.id_med})" class="btn btn-primary btn-sm" >modificar </button>`,
            `<a href="/borrarPas/${item.id_med}" class="btn btn-danger btn-sm" type="button">Eliminar</a>`
        ]).draw(false);


    });
}

// Llamar a la función para cargar los datos
cargarMed();


//funciones concentracion


$(document).ready(function() {
    $('#datatable1').DataTable();
    $('#datatable2').DataTable();
    $('#datatable3').DataTable();
    $('#datatable4').DataTable();
});


async function cargaConcent() {
    const response = await fetch(`/buscar_conc`);
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
            item.id_conc,
            item.concentracion,
          
            `<button onclick="buscarConc(${item.id_conc})" class="btn btn-primary btn-sm" >modificar </button>`,
            `<a href="/borrar_conc/${item.id_conc}" class="btn btn-danger btn-sm" type="button">Eliminar</a>`
        ]).draw(false);


    });
}

// Llamar a la función para cargar los datos
cargaConcent();


//activar modal para modificar concentracion
async function buscarConc(id) {
    // Abre el modal
    const modal = new bootstrap.Modal(document.getElementById('concModal'));
    modal.show();

    const response = await fetch(`/buscarConc/${id}`);
    const { data } = await response.json(); // Desestructurando data del objeto JSON

    // Inyectar datos en los campos del formulario del modal

    document.getElementById('concentracionEdit').value = data[0].concentracion;
 
    // Suponiendo que obtienes data[0].id_pas de algún lugar
    const idConcentracion = data[0].id_conc;

    // Obtener el formulario
    const formulario = document.getElementById('concentracionActualizar');

    // Modificar el action del formulario
    formulario.action = `/updateConc/${idConcentracion}`;

}
$(document).ready(function() {
    $('#datatable5').DataTable();
    $('#datatable6').DataTable();
    $('#datatable7').DataTable();
    $('#datatable8').DataTable();
});
async function cargaConcent0() {
   // Abre el modal
   const modal = new bootstrap.Modal(document.getElementById('concAltaModal'));
   modal.show();

    const response = await fetch(`/buscar_conc0`);
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
            item.id_conc,
            item.concentracion,
           `<a href="/altaConc/${item.id_conc}" class="btn btn-primary btn-sm" type="button">Dar Alta</a>`,
        ]).draw(false);


    });
}

// Llamar a la función para cargar los datos
//