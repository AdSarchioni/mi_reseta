async function cargarPresc() {
    const response = await fetch(`/buscarPresc`);
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
        }
    });

    // Obtener el cuerpo de la tabla
    const tbody = document.getElementById('myTable').querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar el contenido previo de la tabla

    // Agregar los datos a la tabla usando la API de DataTable
    opcionesTabla.forEach(item => {
        table.row.add([
            item.id_presc,
            item.nombre_prof,
            item.apellido_prof,
            item.tipo_esp,
            item.nombre_pas,
            item.apellido_pas,
            item.diagnostico,
            item.prestaciones,
            item.medicamentos, 
            item.obras_sociales,
           `<a href="/editPresc/${item.id_presc}" class="btn btn-info btn-sm" type="button">Ver/Detalle</a>` ,
            `<a href="/borrarPresc/${item.id_presc}" class="btn btn-danger btn-sm" type="button">Eliminar</a>`
        ]).draw(false);

    });
}

// Llamar a la función para cargar los datos
cargarPresc();

async function cargarPresc0() {

    // Abre el modal
    const modal = new bootstrap.Modal(document.getElementById('altaModal'));
    modal.show();
   
   
       const response = await fetch(`/buscarPresc0`);
       const opcionesTabla = await response.json();
   
       // Inicializar DataTable con textos en español y ordenación por la columna de ID en orden descendente
       const table = new DataTable('#myTables', {
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
     // Limpiar la tabla usando el método clear de DataTable
       table.clear().draw();
       // Obtener el cuerpo de la tabla
     
   
       // Agregar los datos a la tabla usando la API de DataTable
       opcionesTabla.forEach(item => {
           table.row.add([
            item.id_presc,
            item.nombre_prof,
            item.apellido_prof,
            item.tipo_esp,
            item.nombre_pas,
            item.apellido_pas,
            item.diagnostico,
            item.prestaciones,
            item.medicamentos, 
            item.obras_sociales,
               `<a href="/altaPresc/${item.id_presc}" class="btn btn-primary btn-sm" type="button">Dar Alta</a>`
           ]).draw(false);
   
   
       });
   }