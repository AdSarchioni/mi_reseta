


$(document).ready(function() {
  
    $('#datatable3').DataTable();
    $('#datatable4').DataTable();
});


$(document).ready(function() {
  
    $('#datatable7').DataTable();
    $('#datatable8').DataTable();
});


/////////////////////////////////////////////////
//funciones obra social

async function cargarObra() {
    const response = await fetch(`/buscar_obra`);
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
            item.id_obra_social,
            item.nombre_obra,
            item.alta,
            `<button onclick="buscarObra(${item.id_obra_social})" class="btn btn-primary btn-sm" >modificar </button>`,
            `<a href="/borrar_obra/${item.id_obra_social}" class="btn btn-danger btn-sm" type="button">Eliminar</a>`
        ]).draw(false);

    

    });
}

// Llamar a la función para cargar los datos
cargarObra()

//activar modal para modificar concentracion
async function buscarObra(id) {
    // Abre el modal
    const modal = new bootstrap.Modal(document.getElementById('obraModal'));
    modal.show();

    const response = await fetch(`/buscarObra/${id}`);
    const { data } = await response.json(); // Desestructurando data del objeto JSON

    // Inyectar datos en los campos del formulario del modal

    document.getElementById('obraEdit').value = data[0].nombre_obra;
 
    // Suponiendo que obtienes data[0].id_pas de algún lugar
    const idObra = data[0].id_obra_social;

    // Obtener el formulario
    const formulario = document.getElementById('obraActualizar');

    // Modificar el action del formulario
    formulario.action = `/updateObra/${idObra}`;

}

async function cargaObra0() {
   // Abre el modal
   const modal = new bootstrap.Modal(document.getElementById('obraAltaModal'));
   modal.show();

    const response = await fetch(`/buscar_obra0`);
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
            item.id_obra_social,
            item.nombre_obra,
            item.alta,
           `<a href="/altaObra/${item.id_obra_social}" class="btn btn-primary btn-sm" type="button">Dar Alta</a>`,
        ]).draw(false);


    });
}
/////////////////////////////////////////////////
//funciones Plan obra social

async function cargarPlan() {
    const response = await fetch(`/buscar_plan`);
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
            item.id_plan_obra_social,
            item.tipo_plan,
            item.nombre_obra,
            item.alta,
            `<button onclick="buscarPlan(${item.id_plan_obra_social})" class="btn btn-primary btn-sm" >modificar </button>`,
            `<a href="/borrar_plan/${item.id_plan_obra_social}" class="btn btn-danger btn-sm" type="button">Eliminar</a>`
        ]).draw(false);


    });
}

// Llamar a la función para cargar los datos
cargarPlan()

//activar modal para modificar concentracion
async function buscarPlan(id) {
    // Abre el modal
    const modal = new bootstrap.Modal(document.getElementById('planModal'));
    modal.show();

    const response = await fetch(`/buscarPlan/${id}`);
    const { data } = await response.json(); // Desestructurando data del objeto JSON

    // Inyectar datos en los campos del formulario del modal

    document.getElementById('planEdit').value = data[0].tipo_plan;
    document.getElementById('obraE').value = data[0].nombre_obra;
    document.getElementById('id_obra_socialE').value = data[0].id_obra_social;
    // Suponiendo que obtienes data[0].id_pas de algún lugar
    const idPlan = data[0].id_plan_obra_social;

    // Obtener el formulario
    const formulario = document.getElementById('planActualizar');

    // Modificar el action del formulario
    formulario.action = `/updatePlan/${idPlan}`;

}

async function cargaPlan0() {
   // Abre el modal
   const modal = new bootstrap.Modal(document.getElementById('planAltaModal'));
   modal.show();

    const response = await fetch(`/buscar_plan0`);
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
            item.id_plan_obra_social,
            item.tipo_plan,
            item.nombre_obra,
            item.alta,
           `<a href="/altaPlan/${item.id_plan_obra_social}" class="btn btn-primary btn-sm" type="button">Dar Alta</a>`,
        ]).draw(false);


    });
}

// Método para buscar obra social
async function fetchBuscarObra() {
    try {
        // Realizar una petición a la URL /buscarObraPas para obtener datos en formato JSON
        const response = await fetch(`/buscar_obra`);
        const data = await response.json();

        // Obtener el elemento datalist donde se mostrarán las sugerencias
        const datalist = document.getElementById('sugerenciasObra');
        datalist.innerHTML = ''; // Limpiar opciones existentes

        // Recorrer los datos obtenidos y agregar opciones al datalist
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.nombre_obra}`;
            // Guardar el id_plan en un atributo de datos de la opción
            option.setAttribute('data-id', item.id_obra_social);
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching obra social:', error);
    }
}

// Evento para capturar la entrada del usuario en el campo de texto
document.getElementById('obra').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        // Llamar a la función fetchBuscarObra si hay al menos un carácter ingresado
        fetchBuscarObra();
    }
});

// Evento para capturar el cambio en el campo de texto (cuando se selecciona una opción del datalist)
document.getElementById('obra').addEventListener('input', (event) => {
    const inputValue = event.target.value; // Obtener el valor del campo de texto
    const options = document.querySelectorAll('#sugerenciasObra option');
    const hiddenInput = document.getElementById('id_obra_social');

    hiddenInput.value = ''; // Limpiar el valor del input oculto

    // Recorrer las opciones del datalist para encontrar la seleccionada
    options.forEach(option => {
        if (option.value === inputValue) {
            // Asignar el id_plan al input oculto si se encuentra una coincidencia
            hiddenInput.value = option.getAttribute('data-id');
        }
    });
});

// Método para buscar obra social
async function fetchBuscarObraE() {
    try {
        // Realizar una petición a la URL /buscarObraPas para obtener datos en formato JSON
        const response = await fetch(`/buscar_obra`);
        const data = await response.json();

        // Obtener el elemento datalist donde se mostrarán las sugerencias
        const datalist = document.getElementById('sugerenciasObraE');
        datalist.innerHTML = ''; // Limpiar opciones existentes

        // Recorrer los datos obtenidos y agregar opciones al datalist
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.nombre_obra}`;
            // Guardar el id_plan en un atributo de datos de la opción
            option.setAttribute('data-id', item.id_obra_social);
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching obra social:', error);
    }
}

// Evento para capturar la entrada del usuario en el campo de texto
document.getElementById('obraE').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        // Llamar a la función fetchBuscarObra si hay al menos un carácter ingresado
        fetchBuscarObraE();
    }
});

// Evento para capturar el cambio en el campo de texto (cuando se selecciona una opción del datalist)
document.getElementById('obraE').addEventListener('input', (event) => {
    const inputValue = event.target.value; // Obtener el valor del campo de texto
    const options = document.querySelectorAll('#sugerenciasObraE option');
    const hiddenInput = document.getElementById('id_obra_socialE');

    hiddenInput.value = ''; // Limpiar el valor del input oculto

    // Recorrer las opciones del datalist para encontrar la seleccionada
    options.forEach(option => {
        if (option.value === inputValue) {
            // Asignar el id_plan al input oculto si se encuentra una coincidencia
            hiddenInput.value = option.getAttribute('data-id');
        }
    });
});