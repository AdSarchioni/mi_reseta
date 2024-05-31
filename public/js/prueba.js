

async function fetchBuscarPasientes() {
  try {
    
      const response = await fetch(`/pasciente`);
      const data = await response.json();

      const datalist = document.getElementById('sugerenciasNombre_pas');
      datalist.innerHTML = ''; // Limpiar opciones existentes
      data.forEach(item => {
          const option = document.createElement('option');
          option.value = `${item.id_pas}-${item.nombre_pas}-${item.apellido_pas}-${item.dni_pas}-${item.fecha_nac_pas}-${item.sexo_pas}-${item.alta_pas}-${item.id_plan_obra_social}-${item.tipo_plan}-${item.nombre_obra}` 
          datalist.appendChild(option);
      });
  } catch (error) {
      console.error('Error fetching prestaciones:', error);
  }
}

document.getElementById('nombre_pas').addEventListener('input', (event) => {
  const query = event.target.value;
  if (query.length >= 2) { 
      fetchBuscarPasientes();
  }
});

document.getElementById('nombre_pas').addEventListener('input', function () {
  const text = this.value;
  const cleanedText = text.replace(/\s/g, ''); // Remove all spaces
  const button = document.getElementById('pascienteButton');

  if (cleanedText.length >= 20) {
      button.style.backgroundColor = 'lightgreen';
  } else {
      button.style.backgroundColor = '';
  }
});














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
          
        `;
        tbody.appendChild(row);
    });
}

async function fetchPrestaciones(datalistId) {
  try {
    const response = await fetch('/prestaciones');
    const data = await response.json();

    const datalist = document.getElementById(datalistId);
    datalist.innerHTML = ''; // Limpiar opciones existentes
    data.forEach(item => {
      const option = document.createElement('option');
      option.value = `${item.id_presta}-${item.nombre}`;
      datalist.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching prestaciones:', error);
  }
}

function checkPrestacionesSelection() {
  const inputs = document.querySelectorAll('#contenedorBusquedaPrestaciones input[list]');
  const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
  const accordionButton = document.getElementById('accordionButtonPrestaciones');
  
  if (allFilled) {
    accordionButton.style.backgroundColor = 'lightgreen';
    accordionButton.innerText = 'Prestaciones Seleccionadas';
  } else {
    accordionButton.style.backgroundColor = '';
    accordionButton.innerText = 'Buscar Prestación';
  }
}

function agregarCamposBusquedaPrestaciones() {
  const cantidadPrestaciones = document.getElementById('cantidadPrestaciones').value;
  const contenedorBusquedaPrestaciones = document.getElementById('contenedorBusquedaPrestaciones');
  
  // Guardar valores existentes
  const valoresExistentes = [];
  const inputsExistentes = contenedorBusquedaPrestaciones.querySelectorAll('input[type="text"]');
  inputsExistentes.forEach(input => {
    valoresExistentes.push(input.value);
  });
  
  // Limpiar contenedor antes de agregar nuevos campos
  contenedorBusquedaPrestaciones.innerHTML = '';
  
  // Generar campos de búsqueda de prestaciones
  for (let i = 0; i < cantidadPrestaciones; i++) {
    const inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group', 'mb-3');
    
    const input = document.createElement('input');
    input.classList.add('form-control');
    input.setAttribute('type', 'text');
    input.setAttribute('list', `datalistOptions${i}`);
    input.setAttribute('placeholder', 'Escribe para buscar...');
    input.name = `datalista${i}`;
    
    // Restaurar valor existente si está disponible
    if (valoresExistentes[i]) {
      input.value = valoresExistentes[i];
    }
    
    const dataList = document.createElement('datalist');
    dataList.id = `datalistOptions${i}`;
    
    inputGroup.appendChild(input);
    inputGroup.appendChild(dataList);
    contenedorBusquedaPrestaciones.appendChild(inputGroup);
    
    // Agregar evento para cargar el datalist al hacer clic en el input
    input.addEventListener('focus', () => fetchPrestaciones(dataList.id));
    
    // Agregar evento para verificar si todos los campos están completos
    input.addEventListener('input', checkPrestacionesSelection);
  }
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
          
      
          const datalist = document.getElementById(datalistId);
          datalist.innerHTML = ''; // Limpiar opciones existentes
          data.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.nombre}-${item.nombre_comercial}-${item.concentracion}-${item.forma_farma}`;
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

      function checkAllInputsFilled() {
        const inputs = document.querySelectorAll('#inputsContainer input[list]');
        const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
        const accordionButton = document.getElementById('accordionButtonAdministracion');
    
        if (allFilled) {
            accordionButton.style.backgroundColor = 'lightgreen';
            accordionButton.innerText = 'Administracion Seleccionada';
        } else {
            accordionButton.style.backgroundColor = '';
            accordionButton.innerText = 'Buscar Administracion';
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
        const botonGenerarAdministracion = document.getElementById('btnGenerarCamposAdministracion');
        botonGenerarAdministracion.addEventListener('click', agregarCamposAdministracion);
    
    
        const botonGenerarAdPresta = document.getElementById('btnGenerarCamposAdPresta');
        botonGenerarAdPresta.addEventListener('click', agregarCamposAdPresta);
    
    
      });



    
    
    function agregarCamposAdministracion() {
        const count = parseInt(document.getElementById('administrationCount').value);
        const container = document.getElementById('inputsContainer');
        
        // Guardar valores existentes
        const valoresExistentes = [];
        const inputsExistentes = container.querySelectorAll('input');
        inputsExistentes.forEach(input => {
            valoresExistentes.push({ name: input.name, value: input.value });
        });
        
        container.innerHTML = '';
    
        for (let i = 0; i < count; i++) {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'row g-3 mb-3';
            inputGroup.innerHTML = `
                <div class="col-sm">
                    <input type="text" class="form-control" name="medicamento${i}" placeholder="Medicamento ${i + 1}" aria-label="Medicamento" list="medicamentoList${i}" oninput="checkAllInputsFilled()">
                    <datalist id="medicamentoList${i}"></datalist>
                </div>
                <div class="col-sm">
                    <input type="text" class="form-control" name="dosis${i}" placeholder="Dosis" aria-label="Dosis" list="dosisList${i}" oninput="checkAllInputsFilled()">
                    <datalist id="dosisList${i}"></datalist>
                </div>
                <div class="col-sm">
                    <input type="text" class="form-control" name="cantidad${i}" placeholder="Cantidad" aria-label="Cantidad" list="cantidadList${i}" oninput="checkAllInputsFilled()">
                    <datalist id="cantidadList${i}"></datalist>
                </div>
                <div class="col-sm">
                    <input type="text" class="form-control" name="frecuencia${i}" placeholder="Frecuencia" aria-label="Frecuencia" list="frecuenciaList${i}" oninput="checkAllInputsFilled()">
                    <datalist id="frecuenciaList${i}"></datalist>
                </div>
                <div class="col-sm">
                    <input type="text" class="form-control" name="duracion${i}" placeholder="Duración" aria-label="Duración" list="duracionList${i}" oninput="checkAllInputsFilled()">
                    <datalist id="duracionList${i}"></datalist>
                </div>
            `;
            container.appendChild(inputGroup);
    
            // Restaurar valores existentes si están disponibles
            valoresExistentes.forEach(({ name, value }) => {
                const input = document.querySelector(`input[name="${name}"]`);
                if (input) {
                    input.value = value;
                }
            });
    
            // Populate each datalist with fetched data
            populateDatalist('/medicamentos', `medicamentoList${i}`);
            populateDatalist('/dosis/dosisList', `dosisList${i}`);
            populateDatalist('/cantidad/cantidadList', `cantidadList${i}`);
            populateDatalist('/frecuencia/frecuenciaList', `frecuenciaList${i}`);
            populateDatalist('/duracion/duracionList', `duracionList${i}`);
        }
    }
    


    function agregarCamposAdPresta() {
      const count = parseInt(document.getElementById('adPrestaCount').value);
      const container = document.getElementById('inputsContainer1');
      
      // Guardar valores existentes
      const valoresExistentes = [];
      const inputsExistentes = container.querySelectorAll('input');
      inputsExistentes.forEach(input => {
          valoresExistentes.push({ name: input.name, value: input.value });
      });
      
      container.innerHTML = '';
  
      for (let i = 0; i < count; i++) {
          const inputGroup = document.createElement('div');
          inputGroup.className = 'row g-3 mb-3';
          inputGroup.innerHTML = `
              <div class="col-sm">
                  <input type="text" class="form-control" name="prestacion${i}" placeholder="Prestación ${i + 1}" aria-label="Prestación" list="prestacionList${i}" oninput="checkAllInputsFilled('Prestacion')">
                  <datalist id="prestacionList${i}"></datalist>
              </div>
         
          <div class="col-sm">
              <input type="text" class="form-control" name="cantidads${i}" placeholder="Cantidad" aria-label="Cantidad" list="cantidadList${i}" oninput="checkAllInputsFilled()">
              <datalist id="cantidadList${i}"></datalist>
          </div>
          <div class="col-sm">
              <input type="text" class="form-control" name="frecuencias${i}" placeholder="Frecuencia" aria-label="Frecuencia" list="frecuenciaList${i}" oninput="checkAllInputsFilled()">
              <datalist id="frecuenciaList${i}"></datalist>
          </div>
          <div class="col-sm">
              <input type="text" class="form-control" name="duracions${i}" placeholder="Duración" aria-label="Duración" list="duracionList${i}" oninput="checkAllInputsFilled()">
              <datalist id="duracionList${i}"></datalist>
          </div>
          `;
          container.appendChild(inputGroup);
  
          // Restaurar valores existentes si están disponibles
          valoresExistentes.forEach(({ name, value }) => {
              const input = document.querySelector(`input[name="${name}"]`);
              if (input) {
                  input.value = value;
              }
          });
  
          // Populate each datalist with fetched data
          populateDatalist('/prestacionesId', `prestacionList${i}`);
          populateDatalist('/cantidad/cantidadList', `cantidadList${i}`);
          populateDatalist('/frecuencia/frecuenciaList', `frecuenciaList${i}`);
          populateDatalist('/duracion/duracionList', `duracionList${i}`);
      }
  }








    async function populateDatalist(endpoint, datalistId) {
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
    
            const datalist = document.getElementById(datalistId);
            datalist.innerHTML = ''; // Clear existing options
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.nombre;
                datalist.appendChild(option);



            });
        } catch (error) {
            console.error(`Error fetching data from ${endpoint}:`, error);
        }
    }
    
 
    
    
    document.getElementById('diagnostico').addEventListener('input', function () {
      const text = this.value;
      const cleanedText = text.replace(/\s/g, ''); // Remove all spaces
      const button = document.getElementById('diagnosticoButton');
  
      if (cleanedText.length >= 20) {
          button.style.backgroundColor = 'lightgreen';
      } else {
          button.style.backgroundColor = '';
      }
  });




