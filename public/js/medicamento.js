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
            `<button onclick="buscarMed(${item.id})" class="btn btn-primary btn-sm" >modificar </button>`,
            `<a href="/borrar_medica/${item.id}" class="btn btn-danger btn-sm" type="button">Eliminar</a>`
        ]).draw(false);


    });
}

// Llamar a la función para cargar los datos
cargarMed();

// Método para buscar obra social
async function fetchBuscarForma() {
    try {
        // Realizar una petición a la URL /buscarObraPas para obtener datos en formato JSON
        const response = await fetch(`/buscar_forma`);
        const data = await response.json();

        // Obtener el elemento datalist donde se mostrarán las sugerencias
        const datalist = document.getElementById('sugerenciasForma_farma');
        datalist.innerHTML = ''; // Limpiar opciones existentes

        // Recorrer los datos obtenidos y agregar opciones al datalist
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.forma_fa}`;
            // Guardar el id_plan en un atributo de datos de la opción
            option.setAttribute('data-id', item.id_for_fa);
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching obra social:', error);
    }
}

// Evento para capturar la entrada del usuario en el campo de texto
document.getElementById('forma_farma').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        // Llamar a la función fetchBuscarObra si hay al menos un carácter ingresado
        fetchBuscarForma();
    }
});
// Evento para capturar el cambio en el campo de texto (cuando se selecciona una opción del datalist)
document.getElementById('forma_farma').addEventListener('change', (event) => {
    const inputValue = event.target.value; // Obtener el valor del campo de texto
    const options = document.querySelectorAll('#sugerenciasForma_farma option');
    const hiddenInput = document.getElementById('id_for_fa');

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
async function fetchBuscarConcentracion() {
    try {
        // Realizar una petición a la URL /buscarObraPas para obtener datos en formato JSON
        const response = await fetch(`/buscar_conc`);
        const data = await response.json();

        // Obtener el elemento datalist donde se mostrarán las sugerencias
        const datalist = document.getElementById('sugerenciasConcentracion');
        datalist.innerHTML = ''; // Limpiar opciones existentes

        // Recorrer los datos obtenidos y agregar opciones al datalist
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.concentracion}`;
            // Guardar el id_plan en un atributo de datos de la opción
            option.setAttribute('data-id', item.id_conc);
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching obra social:', error);
    }
}

// Evento para capturar la entrada del usuario en el campo de texto
document.getElementById('concentra').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        // Llamar a la función fetchBuscarObra si hay al menos un carácter ingresado
        fetchBuscarConcentracion();
    }
});
// Evento para capturar el cambio en el campo de texto (cuando se selecciona una opción del datalist)
document.getElementById('concentra').addEventListener('change', (event) => {
    const inputValue = event.target.value; // Obtener el valor del campo de texto
    const options = document.querySelectorAll('#sugerenciasConcentracion option');
    const hiddenInput = document.getElementById('id_concent');

    hiddenInput.value = ''; // Limpiar el valor del input oculto

    // Recorrer las opciones del datalist para encontrar la seleccionada
    options.forEach(option => {
        if (option.value === inputValue) {
            // Asignar el id_plan al input oculto si se encuentra una coincidencia
            hiddenInput.value = option.getAttribute('data-id');
        }
    });
});

// Método para buscar Familia
async function fetchBuscarFamilia() {
    try {
        // Realizar una petición a la URL /buscarObraPas para obtener datos en formato JSON
        const response = await fetch(`/buscar_fam`);
        const data = await response.json();

        // Obtener el elemento datalist donde se mostrarán las sugerencias
        const datalist = document.getElementById('sugerenciasFamilia');
        datalist.innerHTML = ''; // Limpiar opciones existentes

        // Recorrer los datos obtenidos y agregar opciones al datalist
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.familia}`;
            // Guardar el id_plan en un atributo de datos de la opción
            option.setAttribute('data-id', item.id_fam);
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching obra social:', error);
    }
}

// Evento para capturar la entrada del usuario en el campo de texto
document.getElementById('familia').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        // Llamar a la función fetchBuscarObra si hay al menos un carácter ingresado
        fetchBuscarFamilia();
    }
});
// Evento para capturar el cambio en el campo de texto (cuando se selecciona una opción del datalist)
document.getElementById('familia').addEventListener('change', (event) => {
    const inputValue = event.target.value; // Obtener el valor del campo de texto
    const options = document.querySelectorAll('#sugerenciasFamilia option');
    const hiddenInput = document.getElementById('id_fam');

    hiddenInput.value = ''; // Limpiar el valor del input oculto

    // Recorrer las opciones del datalist para encontrar la seleccionada
    options.forEach(option => {
        if (option.value === inputValue) {
            // Asignar el id_plan al input oculto si se encuentra una coincidencia
            hiddenInput.value = option.getAttribute('data-id');
        }
    });
});

// Método para buscar Familia
async function fetchBuscarPresentacion() {
    try {
        // Realizar una petición a la URL /buscarObraPas para obtener datos en formato JSON
        const response = await fetch(`/buscar_present`);
        const data = await response.json();

        // Obtener el elemento datalist donde se mostrarán las sugerencias
        const datalist = document.getElementById('sugerenciasPresentacion');
        datalist.innerHTML = ''; // Limpiar opciones existentes

        // Recorrer los datos obtenidos y agregar opciones al datalist
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.presentacion}`;
            // Guardar el id_plan en un atributo de datos de la opción
            option.setAttribute('data-id', item.id_present);
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching obra social:', error);
    }
}

// Evento para capturar la entrada del usuario en el campo de texto
document.getElementById('presentacion').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        // Llamar a la función fetchBuscarObra si hay al menos un carácter ingresado
        fetchBuscarPresentacion();
    }
});
// Evento para capturar el cambio en el campo de texto (cuando se selecciona una opción del datalist)
document.getElementById('presentacion').addEventListener('change', (event) => {
    const inputValue = event.target.value; // Obtener el valor del campo de texto
    const options = document.querySelectorAll('#sugerenciasPresentacion option');
    const hiddenInput = document.getElementById('id_present');

    hiddenInput.value = ''; // Limpiar el valor del input oculto

    // Recorrer las opciones del datalist para encontrar la seleccionada
    options.forEach(option => {
        if (option.value === inputValue) {
            // Asignar el id_plan al input oculto si se encuentra una coincidencia
            hiddenInput.value = option.getAttribute('data-id');
        }
    });
});

async function buscarMed(id) {
    // Abre el modal
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();

    const response = await fetch(`/buscarMedica/${id}`);
   const { data } = await response.json(); // Desestructurando data del objeto JSON

    // Inyectar datos en los campos del formulario del modal

    document.getElementById('id_reg_nacE').value = data[0].id_reg_nac;
    document.getElementById('nombre_comercialE').value = data[0].nombre_comercial;
    document.getElementById('nombre_genericoE').value = data[0].nombre_generico;
    document.getElementById('concentracionE').value = data[0].concentracion;
    document.getElementById('forma_farmaE').value = data[0].forma_farma;
    document.getElementById('familiaE').value = data[0].familia;
    document.getElementById('presentacionE').value = data[0].presentacion;
    // Suponiendo que obtienes data[0].id_pas de algún lugar
    const idMed = data[0].id;

    // Obtener el formulario
    const formulario = document.getElementById('formularioActualizar');

    // Modificar el action del formulario
    formulario.action = `/updateMedica/${idMed}`;

}