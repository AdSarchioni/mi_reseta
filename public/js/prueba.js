
async function cargarPas() {
    const valorImput1 = document.getElementById("nombre").value;

    const response = await fetch(`/buscaPa/${valorImput1}`);
    const opcionesTabla = await response.json();


    // Llenar la tabla con los datos obtenidos
    const tbody = document.getElementById('resultadosTabla').querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar el contenido previo de la tabla

    opcionesTabla.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><input type="checkbox" name="id_pas" value="${item.id_pas}"></td>
             <td>${item.id_pas}</td>
              <td>${item.nombre_pas}</td>
              <td>${item.apellido_pas}</td>
              <td>${item.dni_pas}</td>
             <!-- Agrega más celdas según tu esquema de base de datos -->
        `;
        tbody.appendChild(row);
    });
}

async function cargarProf() {
    const valorImput1 = document.getElementById("nombre_prof").value;

    const response = await fetch(`/buscaProf/${valorImput1}`);
    const opcionesTabla = await response.json();

    // Llenar la tabla con los datos obtenidos
    const tbody = document.getElementById('resultadosTabla1').querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar el contenido previo de la tabla

    opcionesTabla.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><input type="checkbox" name="id_prof" value="${item.id_prof}"></td>
             <td>${item.id_prof}</td>  
             <td>${item.nombre_prof}</td>
              <td>${item.apellido_prof}</td>
              <td>${item.dni_prof}</td>
             <!-- Agrega más celdas según tu esquema de base de datos -->
        `;
        tbody.appendChild(row);
    });
}

      // Función para cargar opciones del Combo Box 2
      
      async function cargarProf() {
        const valorImput1 = document.getElementById("nombre_prof").value;
    
        const response = await fetch(`/buscaProf/${valorImput1}`);
        const opcionesTabla = await response.json();
    
        // Obtener el elemento select
        const selectElement = document.getElementById('resultadosSelect');
        selectElement.innerHTML = ''; // Limpiar las opciones previas
    
        opcionesTabla.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id_prof;
            option.text = `${item.nombre_prof} ${item.apellido_prof} - DNI: ${item.dni_prof}`;
            selectElement.appendChild(option);
        });
    }
    











