async function cargaRefe() {
    const response = await fetch(`/buscar_refe`);
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
            item.id_refers,
            item.numero,
            item.alta,
            `<button onclick="buscarRefe(${item.id_refers})" class="btn btn-primary btn-sm" >modificar </button>`,
            `<a href="/borrar_refe/${item.id_refers}" class="btn btn-danger btn-sm" type="button">Eliminar</a>`
        ]).draw(false);


    });
}

// Llamar a la función para cargar los datos
cargaRefe();

//activar modal para modificar concentracion
async function buscarRefe(id) {
    // Abre el modal
    const modal = new bootstrap.Modal(document.getElementById('refeModal'));
    modal.show();

    const response = await fetch(`/buscarRefe/${id}`);
    const { data } = await response.json(); // Desestructurando data del objeto JSON

    // Inyectar datos en los campos del formulario del modal

    document.getElementById('numEdit').value = data[0].numero;
 
    // Suponiendo que obtienes data[0].id_pas de algún lugar
    const idRefe = data[0].id_refers;

    // Obtener el formulario
    const formulario = document.getElementById('refeActualizar');

    // Modificar el action del formulario
    formulario.action = `/updateRefe/${idRefe}`;

}

async function cargaRefe0() {
    // Abre el modal
    const modal = new bootstrap.Modal(document.getElementById('refeAltaModal'));
    modal.show();
 
     const response = await fetch(`/buscar_refe0`);
     const opcionesTabla = await response.json();
 
     // Inicializar DataTable con textos en español y ordenación por la columna de ID en orden descendente
     const table = new DataTable('#datatable0', {
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
     const tbody = document.getElementById('datatable0').querySelector('tbody');
     tbody.innerHTML = ''; // Limpiar el contenido previo de la tabla
 
     // Agregar los datos a la tabla usando la API de DataTable
     opcionesTabla.forEach(item => {
         table.row.add([
             item.id_refers,
             item.numero,
             item.alta,
            `<a href="/altaRefe/${item.id_refers}" class="btn btn-primary btn-sm" type="button">Dar Alta</a>`,
         ]).draw(false);
 
 
     });
 }
