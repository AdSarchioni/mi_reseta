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
            item.id_presc,
            item.nombre_prof,
            item.apellido_prof,
            item.matricula,
            item.refeps,
            item.tipo_esp,
            item.nombre_pas,
            item.apellido_pas,
            item.dni_pas,
            item.nombre_obra,
            item.tipo_plan,
            item.prestacion,
            item.nombre_comercial,
            item.nombre_generico,
            item.concentracion,
            item.familia,
            item.forma_fa,
            item.presentacion,
            item.cantidad,
            item.dosis,
            item.duracion,
            item.frecuencia,
            `<button onclick="buscarProf(${item.id_presc})" class="btn btn-primary btn-sm" >modificar </button>`,
            `<a href="/borrarProf/${item.id_presc}" class="btn btn-danger btn-sm" type="button">Eliminar</a>`
        ]).draw(false);

    });
}

// Llamar a la función para cargar los datos
cargarPresc();

// Método para buscar obra social
async function fetchBuscarEspe() {
    try {
        // Realizar una petición a la URL /buscarObraPas para obtener datos en formato JSON
        const response = await fetch(`/buscar_espe`);
        const data = await response.json();

        // Obtener el elemento datalist donde se mostrarán las sugerencias
        const datalist = document.getElementById('sugerenciasEspe');
        datalist.innerHTML = ''; // Limpiar opciones existentes

        // Recorrer los datos obtenidos y agregar opciones al datalist
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.tipo_esp}`;
            // Guardar el id_plan en un atributo de datos de la opción
            option.setAttribute('data-id', item.id_especialidad);
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching obra social:', error);
    }
}

// Evento para capturar la entrada del usuario en el campo de texto
document.getElementById('tipo_esp').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        // Llamar a la función fetchBuscarObra si hay al menos un carácter ingresado
        fetchBuscarEspe();
    }
});

// Evento para capturar el cambio en el campo de texto (cuando se selecciona una opción del datalist)
document.getElementById('tipo_esp').addEventListener('change', (event) => {
    const inputValue = event.target.value; // Obtener el valor del campo de texto
    const options = document.querySelectorAll('#sugerenciasEspe option');
    const hiddenInput = document.getElementById('id_especialidad');

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
async function fetchBuscarRefe() {
    try {
        // Realizar una petición a la URL /buscarObraPas para obtener datos en formato JSON
        const response = await fetch(`/buscar_refe`);
        const data = await response.json();

        // Obtener el elemento datalist donde se mostrarán las sugerencias
        const datalist = document.getElementById('sugerenciasRefe');
        datalist.innerHTML = ''; // Limpiar opciones existentes

        // Recorrer los datos obtenidos y agregar opciones al datalist
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.numero}`;
            // Guardar el id_plan en un atributo de datos de la opción
            option.setAttribute('data-id', item.id_refers);
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching obra social:', error);
    }
}

// Evento para capturar la entrada del usuario en el campo de texto
document.getElementById('refeps').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        // Llamar a la función fetchBuscarObra si hay al menos un carácter ingresado
        fetchBuscarRefe();
    }
});

// Evento para capturar el cambio en el campo de texto (cuando se selecciona una opción del datalist)
document.getElementById('refeps').addEventListener('input', (event) => {
    const inputValue = event.target.value; // Obtener el valor del campo de texto
    const options = document.querySelectorAll('#sugerenciasRefe option');
    const hiddenInput = document.getElementById('id_refer');

    hiddenInput.value = ''; // Limpiar el valor del input oculto

    // Recorrer las opciones del datalist para encontrar la seleccionada
    options.forEach(option => {
        if (option.value === inputValue) {
            // Asignar el id_plan al input oculto si se encuentra una coincidencia
            hiddenInput.value = option.getAttribute('data-id');
        }
    });
});

async function buscarProf(id) {
    // Abre el modal
    const modal = new bootstrap.Modal(document.getElementById('profeModal'));
    modal.show();

    const response = await fetch(`/buscarProf/${id}`);
    const { data } = await response.json(); // Desestructurando data del objeto JSON

    // Inyectar datos en los campos del formulario del modal

    document.getElementById('id_referE').value = data[0].id_refer;
    document.getElementById('refepsE').value = data[0].numero;
    document.getElementById('tipo_espE').value = data[0].tipo_esp;
    document.getElementById('id_especialidadE').value = data[0].id_especialidad;
    document.getElementById('matriculaE').value = data[0].matricula;
    document.getElementById('nombre_profE').value = data[0].nombre_prof;
    document.getElementById('apellido_profE').value = data[0].apellido_prof;
    document.getElementById('dni_profE').value = data[0].dni_prof;
    document.getElementById('domicilio_profE').value = data[0].domicilio_prof;
    document.getElementById('mail_profE').value = data[0].mail_prof;
    document.getElementById('tel_profE').value = data[0].tel_prof;
    // Suponiendo que obtienes data[0].id_pas de algún lugar
    const idProf = data[0].id_prof;

    // Obtener el formulario
    const formulario = document.getElementById('formularioActualizar');

    // Modificar el action del formulario
    formulario.action = `/updateProf/${idProf}`;

}

// Método para buscar
async function fetchBuscarEspeE() {
    try {
        // Realizar una petición a la URL /buscarObraPas para obtener datos en formato JSON
        const response = await fetch(`/buscar_espe`);
        const data = await response.json();

        // Obtener el elemento datalist donde se mostrarán las sugerencias
        const datalist = document.getElementById('sugerenciasEspeE');
        datalist.innerHTML = ''; // Limpiar opciones existentes

        // Recorrer los datos obtenidos y agregar opciones al datalist
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.tipo_esp}`;
            // Guardar el id_plan en un atributo de datos de la opción
            option.setAttribute('data-id', item.id_especialidad);
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching obra social:', error);
    }
}

// Evento para capturar la entrada del usuario en el campo de texto
document.getElementById('tipo_espE').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        // Llamar a la función fetchBuscarObra si hay al menos un carácter ingresado
        fetchBuscarEspeE();
    }
});

// Evento para capturar el cambio en el campo de texto (cuando se selecciona una opción del datalist)
document.getElementById('tipo_espE').addEventListener('change', (event) => {
    const inputValue = event.target.value; // Obtener el valor del campo de texto
    const options = document.querySelectorAll('#sugerenciasEspeE option');
    const hiddenInput = document.getElementById('id_especialidadE');

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
async function fetchBuscarRefeE() {
    try {
        // Realizar una petición a la URL /buscarObraPas para obtener datos en formato JSON
        const response = await fetch(`/buscar_refe`);
        const data = await response.json();

        // Obtener el elemento datalist donde se mostrarán las sugerencias
        const datalist = document.getElementById('sugerenciasRefeE');
        datalist.innerHTML = ''; // Limpiar opciones existentes

        // Recorrer los datos obtenidos y agregar opciones al datalist
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.numero}`;
            // Guardar el id_plan en un atributo de datos de la opción
            option.setAttribute('data-id', item.id_refers);
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching obra social:', error);
    }
}

// Evento para capturar la entrada del usuario en el campo de texto
document.getElementById('refepsE').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        // Llamar a la función fetchBuscarObra si hay al menos un carácter ingresado
        fetchBuscarRefeE();
    }
});

// Evento para capturar el cambio en el campo de texto (cuando se selecciona una opción del datalist)
document.getElementById('refepsE').addEventListener('input', (event) => {
    const inputValue = event.target.value; // Obtener el valor del campo de texto
    const options = document.querySelectorAll('#sugerenciasRefeE option');
    const hiddenInput = document.getElementById('id_referE');

    hiddenInput.value = ''; // Limpiar el valor del input oculto

    // Recorrer las opciones del datalist para encontrar la seleccionada
    options.forEach(option => {
        if (option.value === inputValue) {
            // Asignar el id_plan al input oculto si se encuentra una coincidencia
            hiddenInput.value = option.getAttribute('data-id');
        }
    });
});