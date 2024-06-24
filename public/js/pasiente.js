
async function cargarPas() {
    const response = await fetch(`/buscar_pas`);
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
            item.id_pas,
            item.nombre_pas,
            item.apellido_pas,
            item.dni_pas,
            item.fecha_nac_pas,
            item.sexo_pas,
            item.alta_pas,
            item.tipo_plan,
            item.nombre_obra,
            `<button onclick="buscarPas(${item.id_pas})" class="btn btn-primary btn-sm" >modificar </button>`,
            `<a href="/borrarPas/${item.id_pas}" class="btn btn-danger btn-sm" type="button">Eliminar</a>`
        ]).draw(false);


    });
}

// Llamar a la función para cargar los datos
cargarPas();

// Método para buscar obra social
async function fetchBuscarObra() {
    try {
        // Realizar una petición a la URL /buscarObraPas para obtener datos en formato JSON
        const response = await fetch(`/buscarObraPas`);
        const data = await response.json();

        // Obtener el elemento datalist donde se mostrarán las sugerencias
        const datalist = document.getElementById('sugerenciasNombre_obra');
        datalist.innerHTML = ''; // Limpiar opciones existentes

        // Recorrer los datos obtenidos y agregar opciones al datalist
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.tipo_plan}-${item.nombre_obra}`;
            // Guardar el id_plan en un atributo de datos de la opción
            option.setAttribute('data-id', item.id_plan);
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching obra social:', error);
    }
}

// Evento para capturar la entrada del usuario en el campo de texto
document.getElementById('tipo_obra').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        // Llamar a la función fetchBuscarObra si hay al menos un carácter ingresado
        fetchBuscarObra();
    }
});

// Evento para capturar el cambio en el campo de texto (cuando se selecciona una opción del datalist)
document.getElementById('tipo_obra').addEventListener('change', (event) => {
    const inputValue = event.target.value; // Obtener el valor del campo de texto
    const options = document.querySelectorAll('#sugerenciasNombre_obra option');
    const hiddenInput = document.getElementById('id_plan');

    hiddenInput.value = ''; // Limpiar el valor del input oculto

    // Recorrer las opciones del datalist para encontrar la seleccionada
    options.forEach(option => {
        if (option.value === inputValue) {
            // Asignar el id_plan al input oculto si se encuentra una coincidencia
            hiddenInput.value = option.getAttribute('data-id');
        }
    });
});



async function buscarPas(id) {
    // Abre el modal
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();

    const response = await fetch(`/buscarPas/${id}`);
    const { data } = await response.json(); // Desestructurando data del objeto JSON

    // Inyectar datos en los campos del formulario del modal

    document.getElementById('nomEdit').value = data[0].nombre_pas;
    document.getElementById('apellEdit').value = data[0].apellido_pas;
    document.getElementById('dniEdit').value = data[0].dni_pas;
    document.getElementById('fechaEdit').value = data[0].fecha_nac_pas;
    document.getElementById('sexoEdit').value = data[0].sexo_pas;
    document.getElementById('tipo_obraE').value = data[0].tipo_plan + '-' + data[0].nombre_obra;
    document.getElementById('id_planE').value = data[0].id_plan_obra_social;
    // Suponiendo que obtienes data[0].id_pas de algún lugar
    const idPasiente = data[0].id_pas;

    // Obtener el formulario
    const formulario = document.getElementById('formularioActualizar');

    // Modificar el action del formulario
    formulario.action = `/updatePas/${idPasiente}`;

}

// Método para buscar obra social
async function fetchBuscarObraE() {
    try {
        // Realizar una petición a la URL /buscarObraPas para obtener datos en formato JSON
        const response = await fetch(`/buscarObraPas`);
        const data = await response.json();

        // Obtener el elemento datalist donde se mostrarán las sugerencias
        const datalist = document.getElementById('sugerenciasNombre_obraE');
        datalist.innerHTML = ''; // Limpiar opciones existentes

        // Recorrer los datos obtenidos y agregar opciones al datalist
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.tipo_plan}-${item.nombre_obra}`;
            // Guardar el id_plan en un atributo de datos de la opción
            option.setAttribute('data-id', item.id_plan);
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching obra social:', error);
    }
}

// Evento para capturar la entrada del usuario en el campo de texto
document.getElementById('tipo_obraE').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        // Llamar a la función fetchBuscarObra si hay al menos un carácter ingresado
        fetchBuscarObraE();
    }
});

// Evento para capturar el cambio en el campo de texto (cuando se selecciona una opción del datalist)
document.getElementById('tipo_obraE').addEventListener('change', (event) => {
    const inputValue = event.target.value; // Obtener el valor del campo de texto
    const options = document.querySelectorAll('#sugerenciasNombre_obraE option');
    const hiddenInput = document.getElementById('id_planE');

    hiddenInput.value = ''; // Limpiar el valor del input oculto

    // Recorrer las opciones del datalist para encontrar la seleccionada
    options.forEach(option => {
        if (option.value === inputValue) {
            // Asignar el id_plan al input oculto si se encuentra una coincidencia
            hiddenInput.value = option.getAttribute('data-id');
        }
    });
});
