//funcion para cargar las tablas
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

        
        <td><input type="checkbox" name="id_pas" value="${item.id_pas}" onclick="checkSelection()"></td>
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
        <td><input type="checkbox" name="id_prof" value="${item.id_prof}" onclick="checkSelection1()"></td>
             <td>${item.id_prof}</td>  
             <td>${item.nombre_prof}</td>
              <td>${item.apellido_prof}</td>
              <td>${item.dni_prof}</td>
             <!-- Agrega más celdas según tu esquema de base de datos -->
        `;
        tbody.appendChild(row);
    });
}

   
    //funcion revisar los checks y poner en verde el boton del acordeon
    function checkSelection() {
        const checkboxes = document.querySelectorAll('#resultadosTabla tbody input[type="checkbox"]');
        const selected = Array.from(checkboxes).some(checkbox => checkbox.checked);
        const accordionButton = document.getElementById('accordionButton');
        if (selected) {
          accordionButton.style.backgroundColor = 'lightgreen';
          accordionButton.innerText = 'Pasiente Seleccionado';
        } else {
          accordionButton.style.backgroundColor = '';
          accordionButton.innerText = 'Buscar Pasiente';
        }
      }
      function checkSelection1() {
        const checkboxes = document.querySelectorAll('#resultadosTabla1 tbody input[type="checkbox"]');
        const selected = Array.from(checkboxes).some(checkbox => checkbox.checked);
        const accordionButton = document.getElementById('accordionButton1');
        if (selected) {
          accordionButton.style.backgroundColor = 'lightgreen';
          accordionButton.innerText = 'Profesional Seleccionado';
        } else {
          accordionButton.style.backgroundColor = '';
          accordionButton.innerText = 'Buscar Profesional';
        }
      } 


      async function fetchMedicamentos(datalistId) {
        try {
          const response = await fetch('/medicamentos');
          const data = await response.json();
          console.log('Received medicamentos:', JSON.stringify(data)); // Verificar los datos recibidos
      
          const datalist = document.getElementById(datalistId);
          datalist.innerHTML = ''; // Limpiar opciones existentes
          data.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.nombre_comercial}-${item.concentracion}-${item.forma_farma}`;
            datalist.appendChild(option);
          });
        } catch (error) {
          console.error('Error fetching medicamentos:', error);
        }
      }
      
      function checkMedicamentosSelection() {
        const inputs = document.querySelectorAll('#contenedorBusquedaMedicamentos input[list]');
        const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
        const accordionButton = document.getElementById('accordionButtonMedicamentos');
        
        if (allFilled) {
          accordionButton.style.backgroundColor = 'lightgreen';
          accordionButton.innerText = 'Medicamentos Seleccionados';
        } else {
          accordionButton.style.backgroundColor = '';
          accordionButton.innerText = 'Buscar Medicamento';
        }
      }
      
      function agregarCamposBusqueda() {
        const cantidadMedicamentos = document.getElementById('cantidadMedicamentos').value;
        const contenedorBusquedaMedicamentos = document.getElementById('contenedorBusquedaMedicamentos');
        
        // Guardar valores existentes
        const valoresExistentes = [];
        const inputsExistentes = contenedorBusquedaMedicamentos.querySelectorAll('input[type="text"]');
        inputsExistentes.forEach(input => {
          valoresExistentes.push(input.value);
        });
        
        // Limpiar contenedor antes de agregar nuevos campos
        contenedorBusquedaMedicamentos.innerHTML = '';
        
        // Generar campos de búsqueda de medicamentos
        for (let i = 0; i < cantidadMedicamentos; i++) {
          const inputGroup = document.createElement('div');
          inputGroup.classList.add('input-group', 'mb-3');
          
          const input = document.createElement('input');
          input.classList.add('form-control');
          input.setAttribute('type', 'text');
          input.setAttribute('list', `datalistOptions${i}`);
          input.setAttribute('placeholder', 'Escribe para buscar...');
          input.name = `datalist${i}`;
          
          // Restaurar valor existente si está disponible
          if (valoresExistentes[i]) {
            input.value = valoresExistentes[i];
          }
          
          const dataList = document.createElement('datalist');
          dataList.id = `datalistOptions${i}`;
          
          inputGroup.appendChild(input);
          inputGroup.appendChild(dataList);
          contenedorBusquedaMedicamentos.appendChild(inputGroup);
          
          // Agregar evento para cargar el datalist al hacer clic en el input
          input.addEventListener('focus', () => fetchMedicamentos(dataList.id));
          
          // Agregar evento para verificar si todos los campos están completos
          input.addEventListener('input', checkMedicamentosSelection);
        }
      }
      
      document.addEventListener('DOMContentLoaded', () => {
        const botonAgregar = document.querySelector('button[type="button"]');
        botonAgregar.addEventListener('click', agregarCamposBusqueda);
      });
      
      
    





