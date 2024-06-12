
async function fetchBuscarPacientes() {
  try {
      const response = await fetch(`/pasciente`);
      const data = await response.json();

      const datalist = document.getElementById('sugerenciasNombre_pas');
      datalist.innerHTML = ''; // Limpiar opciones existentes
      data.forEach(item => {
          const option = document.createElement('option');
          option.value = `${item.nombre_pas}-${item.apellido_pas}-${item.dni_pas}-${item.fecha_nac_pas}-${item.sexo_pas}-${item.alta_pas}-${item.id_plan_obra_social}-${item.tipo_plan}-${item.nombre_obra}`;
          option.dataset.idPas = item.id_pas;
          datalist.appendChild(option);
      });
  } catch (error) {
      console.error('Error fetching pacientes:', error);
  }
}

document.getElementById('nombre_pas').addEventListener('input', (event) => {
  const query = event.target.value;
  if (query.length >= 2) {
      fetchBuscarPacientes();
  }
});

document.getElementById('nombre_pas').addEventListener('input', (event) => {
  const input = event.target;
  const datalist = document.getElementById('sugerenciasNombre_pas');
  const idPasInput = document.getElementById('id_pas');

  const selectedOption = Array.from(datalist.options).find(option => option.value === input.value);
  if (selectedOption) {
      idPasInput.value = selectedOption.dataset.idPas;
  } else {
      idPasInput.value = ''; // Limpiar el campo si no coincide ninguna opción
  }
});

// Crear el nuevo input para mostrar el id_pas
const nombrePasInput = document.getElementById('nombre_pas');
const idPasInput = document.createElement('input');
idPasInput.setAttribute('type', 'text');
idPasInput.setAttribute('id', 'id_pas');
idPasInput.setAttribute('name', 'id_pas');
idPasInput.setAttribute('placeholder', 'ID Paciente');
idPasInput.classList.add('form-control-color');
idPasInput.readOnly = true;

// Insertar el nuevo input antes del input de nombre_pas
nombrePasInput.parentNode.insertBefore(idPasInput, nombrePasInput);

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
    const valorImput1 = document.getElementById("dni_prof").value;

    const response = await fetch(`/buscaProf/${valorImput1}`);
    const opcionesTabla = await response.json();

    // Llenar la tabla con los datos obtenidos
    const tbody = document.getElementById('resultadosTabla1').querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar el contenido previo de la tabla

    opcionesTabla.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><input type="checkbox" name="id_prof" value="${item.id_prof}" onclick="checkSelection1()"></td>
            
            <td>${item.id_refer}</td> 
             <td>${item.id_prof}</td>  
             <td>${item.nombre_prof}</td>
              <td>${item.apellido_prof}</td>
              <td>${item.dni_prof}</td>
              <td>${item.domicilio_prof}</td>  
             <td>${item.mail_prof}</td>
              <td>${item.matricula}</td>
              <td>${item.tel_prof}</td>
              <td>${item.tipo_esp}</td>
        `;
        tbody.appendChild(row);
    });
}

async function fetchPrestaciones(datalistId, idInputName) {
  try {
    const response = await fetch('/prestaciones');
    const data = await response.json();

    const datalist = document.getElementById(datalistId);
    datalist.innerHTML = ''; // Limpiar opciones existentes
    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.nombre;
      option.setAttribute('data-id', item.id_presta);
      datalist.appendChild(option);
    });

    // Agregar evento para actualizar el ID input cuando se selecciona una opción
    const input = document.querySelector(`input[list="${datalistId}"]`);
    input.addEventListener('input', (event) => {
      const selectedOption = Array.from(datalist.options).find(option => option.value === event.target.value);
      if (selectedOption && idInputName) {
        const idInput = document.querySelector(`input[name="${idInputName}"]`);
        idInput.value = selectedOption.getAttribute('data-id');
        checkPrestacionesSelection();
      }
    });
  } catch (error) {
    console.error('Error fetching prestaciones:', error);
  }
}

function agregarCamposBusquedaPrestaciones() {
  const cantidadPrestaciones = document.getElementById('cantidadPrestaciones').value;
  const contenedorBusquedaPrestaciones = document.getElementById('contenedorBusquedaPrestaciones');
  
  // Guardar valores existentes
  const valoresExistentes = [];
  const idsExistentes = [];
  const inputsExistentes = contenedorBusquedaPrestaciones.querySelectorAll('input[type="text"].form-control');
  const idsExistentesInputs = contenedorBusquedaPrestaciones.querySelectorAll('input[type="text"].form-control-color');
  inputsExistentes.forEach((input, index) => {
    valoresExistentes.push(input.value);
    idsExistentes.push(idsExistentesInputs[index] ? idsExistentesInputs[index].value : '');
  });
  
  // Limpiar contenedor antes de agregar nuevos campos
  contenedorBusquedaPrestaciones.innerHTML = '';
  
  // Generar campos de búsqueda de prestaciones
  for (let i = 0; i < cantidadPrestaciones; i++) {
    const inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group', 'mb-3');

    const idInput = document.createElement('input');
    idInput.classList.add('form-control-color');
    idInput.setAttribute('type', 'text');
    idInput.setAttribute('placeholder', `ID Prestación ${i + 1}`);
    idInput.name = `idPrestacion${i}`;
    idInput.readOnly = true;
    
    const input = document.createElement('input');
    input.classList.add('form-control');
    input.setAttribute('type', 'text');
    input.setAttribute('list', `datalistOptions${i}`);
    input.setAttribute('placeholder', 'Escribe para buscar...');
    input.name = `datalista${i}`;
    input.id = `datalista${i}`;
    // Restaurar valor existente si está disponible
    if (valoresExistentes[i]) {
      input.value = valoresExistentes[i];
      idInput.value = idsExistentes[i];
    }
    
    const dataList = document.createElement('datalist');
    dataList.id = `datalistOptions${i}`;
    
    inputGroup.appendChild(idInput);
    inputGroup.appendChild(input);
    inputGroup.appendChild(dataList);
    contenedorBusquedaPrestaciones.appendChild(inputGroup);
    
    // Agregar evento para cargar el datalist al hacer clic en el input
    input.addEventListener('focus', () => fetchPrestaciones(dataList.id, idInput.name));
    
    // Agregar evento para verificar si todos los campos están completos
    input.addEventListener('input', () => {
      checkPrestacionesSelection();
    });
  }
}

function checkPrestacionesSelection() {
  const inputs = document.querySelectorAll('#contenedorBusquedaPrestaciones input[list]');
  const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
  const ids = document.querySelectorAll('#contenedorBusquedaPrestaciones input.form-control-color');
  const idValues = Array.from(ids).map(input => input.value).filter(value => value.trim() !== '');
  const idCounts = {};
  
  let hasDuplicates = false;
  idValues.forEach(id => {
    if (idCounts[id]) {
      idCounts[id]++;
      if (idCounts[id] > 1) {
        hasDuplicates = true;
      }
    } else {
      idCounts[id] = 1;
    }
  });
  
  const accordionButton = document.getElementById('accordionButtonPrestaciones');
  const submitBtn = document.getElementById('submitBtn');

  if (allFilled && !hasDuplicates) {
    accordionButton.style.backgroundColor = 'lightgreen';
    accordionButton.innerText = 'Prestaciones Seleccionadas';
    submitBtn.disabled = false;
  } else if (hasDuplicates) {
    accordionButton.style.backgroundColor = 'red';
    accordionButton.innerText = 'IDs Duplicados';
    submitBtn.disabled = true;
  } else {
    accordionButton.style.backgroundColor = '';
    accordionButton.innerText = 'Buscar Prestación';
    submitBtn.disabled = false;
  }
}

   
  
 

      function agregarCamposBusqueda() {
        const cantidadMedicamentos = document.getElementById('cantidadMedicamentos').value;
        const contenedorBusquedaMedicamentos = document.getElementById('contenedorBusquedaMedicamentos');
        
        // Guardar valores existentes y IDs
        const valoresExistentes = [];
        const idsExistentes = [];
        const inputsExistentes = contenedorBusquedaMedicamentos.querySelectorAll('input[type="text"].form-control');
        const idsExistentesInputs = contenedorBusquedaMedicamentos.querySelectorAll('input[type="text"].id-med-input');
        inputsExistentes.forEach((input, index) => {
            valoresExistentes.push(input.value);
            idsExistentes.push(idsExistentesInputs[index].value);
        });
        
        // Limpiar contenedor antes de agregar nuevos campos
        contenedorBusquedaMedicamentos.innerHTML = '';
        
        // Generar campos de búsqueda de medicamentos
        for (let i = 0; i < cantidadMedicamentos; i++) {
            const inputGroup = document.createElement('div');
            inputGroup.classList.add('input-group', 'mb-3');
            
            // Crear input para el ID del medicamento
            const inputId = document.createElement('input');
            inputId.classList.add('form-control-color', 'id-med-input');
            inputId.setAttribute('type', 'text');
            inputId.setAttribute('placeholder', `ID ${i + 1}`);
            inputId.name = `id_med${i}`;
            inputId.readOnly = true;
            
            // Crear input para el resto de los datos del medicamento
            const input = document.createElement('input');
            input.classList.add('form-control');
            input.setAttribute('type', 'text');
            input.setAttribute('list', `datalistOptions${i}`);
            input.setAttribute('placeholder', 'Escribe para buscar...');
            input.name = `datalist${i}`;
            input.id = `datalist${i}`;
            // Restaurar valores existentes si están disponibles
            if (valoresExistentes[i]) {
                input.value = valoresExistentes[i];
                inputId.value = idsExistentes[i];
            }
            
            const dataList = document.createElement('datalist');
            dataList.id = `datalistOptions${i}`;
            
            inputGroup.appendChild(inputId);
            inputGroup.appendChild(input);
            inputGroup.appendChild(dataList);
            contenedorBusquedaMedicamentos.appendChild(inputGroup);
            
            // Agregar evento para cargar el datalist al hacer clic en el input
            input.addEventListener('focus', () => fetchMedicamentos(dataList.id, inputId));
            
            // Agregar evento para verificar si todos los campos están completos y para llenar el ID
            input.addEventListener('input', () => {
                fillMedicamentoId(inputId, input.value, dataList.id);
                checkMedicamentosSelection();
            });
        }
    }
    


    async function fetchMedicamentos(datalistId, inputId) {
        try {
            const response = await fetch('/medicamentos');
            const data = await response.json();
            // Limpiar opciones existentes en el datalist
            const datalist = document.getElementById(datalistId);
            datalist.innerHTML = ''; 
           
           // Población del datalist con los datos obtenidos
           data.forEach(item => {
                const option = document.createElement('option');
                option.value = `${item.nombre}-${item.concentracion}-${item.forma_farma}-${item.nombre_generico}-${item.presentacion}-${item.familia}`;
                option.dataset.idMed = item.id;
                datalist.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching medicamentos:', error);
        }
    }
    
    function fillMedicamentoId(inputId, value, datalistId) {
        const datalist = document.getElementById(datalistId);
        const selectedOption = Array.from(datalist.options).find(option => option.value === value);
        if (selectedOption) {
            inputId.value = selectedOption.dataset.idMed;
        } else {
            inputId.value = ''; 
        }// Limpiar el inputId si no se encuentra coincidencia
    }
    //revisar imputs llenados o id duplicada

    function checkMedicamentosSelection() {
        const inputs = document.querySelectorAll('#contenedorBusquedaMedicamentos input[list]');
        const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
        const ids = document.querySelectorAll('#contenedorBusquedaMedicamentos input.id-med-input');
        const idValues = Array.from(ids).map(input => input.value).filter(value => value.trim() !== '');
        const idCounts = {};
        
        let idDuplicadas = false;
        idValues.forEach(id => {
            if (idCounts[id]) {
                idCounts[id]++;
                if (idCounts[id] > 1) {
                    idDuplicadas = true;
                }
            } else {
                idCounts[id] = 1;
            }
        });
        
        const accordionButton = document.getElementById('accordionButtonMedicamentos');
        const submitBtn = document.getElementById('submitBtn');
        if (allFilled && !idDuplicadas) {
            accordionButton.style.backgroundColor = 'lightgreen';
            accordionButton.innerText = 'Medicamentos Seleccionados';
            submitBtn.disabled = false;
        } else if (idDuplicadas) {
            accordionButton.style.backgroundColor = 'red';
            accordionButton.innerText = 'Medicamentos Duplicados';
            submitBtn.disabled = true; 
        } else {
            accordionButton.style.backgroundColor = '';
            accordionButton.innerText = 'Buscar Medicamento';
            submitBtn.disabled = false;
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
                  <input type="text" class="form-control-color id-med-input" name="medicamentoId${i}" placeholder="ID Medicamento ${i + 1}" aria-label="ID Medicamento" readonly>
                  <input type="text" class="form-control" name="medicamento${i}" id="medicamento${i}" placeholder="Medicamento ${i + 1}" aria-label="Medicamento" list="medicamentoList${i}" oninput="checkAllInputsFilled()">
                  <datalist id="medicamentoList${i}"></datalist>
              </div>
              <div class="col-sm">
                  <input type="text" class="form-control-color" name="dosisId${i}" placeholder="ID Dosis" aria-label="ID Dosis" readonly>
                  <input type="text" class="form-control" name="dosis${i}" id="dosis${i}" placeholder="Dosis" aria-label="Dosis" list="dosisList${i}" oninput="checkAllInputsFilled()">
                  <datalist id="dosisList${i}"></datalist>
              </div>
              <div class="col-sm">
                  <input type="text" class="form-control-color" name="cantidadId${i}" placeholder="ID Cantidad" aria-label="ID Cantidad" readonly>
                  <input type="text" class="form-control" name="cantidad${i}" id="cantidad${i}" placeholder="Cantidad" aria-label="Cantidad" list="cantidadList${i}" oninput="checkAllInputsFilled()">
                  <datalist id="cantidadList${i}"></datalist>
              </div>
              <div class="col-sm">
                  <input type="text" class="form-control-color" name="frecuenciaId${i}" placeholder="ID Frecuencia" aria-label="ID Frecuencia" readonly>
                  <input type="text" class="form-control" name="frecuencia${i}" id="frecuencia${i}" placeholder="Frecuencia" aria-label="Frecuencia" list="frecuenciaList${i}" oninput="checkAllInputsFilled()">
                  <datalist id="frecuenciaList${i}"></datalist>
              </div>
              <div class="col-sm">
                  <input type="text" class="form-control-color" name="duracionId${i}" placeholder="ID Duración" aria-label="ID Duración" readonly>
                  <input type="text" class="form-control" name="duracion${i}" id="duracion${i}" placeholder="Duración" aria-label="Duración" list="duracionList${i}" oninput="checkAllInputsFilled()">
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
          populateDatalist('/medicamentos', `medicamentoList${i}`, `medicamentoId${i}`);
          populateDatalist('/dosis/dosisList', `dosisList${i}`, `dosisId${i}`);
          populateDatalist('/cantidad/cantidadList', `cantidadList${i}`, `cantidadId${i}`);
          populateDatalist('/frecuencia/frecuenciaList', `frecuenciaList${i}`, `frecuenciaId${i}`);
          populateDatalist('/duracion/duracionList', `duracionList${i}`, `duracionId${i}`);
      }
  }
  
  async function populateDatalist(endpoint, datalistId, idInputName) {
      try {
          const response = await fetch(endpoint);
          const data = await response.json();
  
          const datalist = document.getElementById(datalistId);
          datalist.innerHTML = ''; // Clear existing options
          data.forEach(item => {
              const option = document.createElement('option');
              option.value = item.nombre;
              option.setAttribute('data-id', item.id);
              datalist.appendChild(option);
          });
  
          // Agregue un detector de eventos a la entrada para actualizar la entrada de ID cuando se selecciona una opción
          const input = document.querySelector(`input[list="${datalistId}"]`);
          input.addEventListener('input', (event) => {
              const selectedOption = Array.from(datalist.options).find(option => option.value === event.target.value);
              if (selectedOption && idInputName) {
                  const idInput = document.querySelector(`input[name="${idInputName}"]`);
                  idInput.value = selectedOption.getAttribute('data-id');
                  checkAllInputsFilled(); // Verificar los inputs después de actualizar el valor
              }
          });
      } catch (error) {
          console.error(`Error fetching data from ${endpoint}:`, error);
      }
  }
  
  function checkAllInputsFilled() {
      // Obtener todos los inputs dentro del contenedor 'inputsContainer'
      const inputs = document.querySelectorAll('#inputsContainer input');
  
      // Verificar si todos los inputs están llenos
      const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
  
      // Obtener los valores de los inputs medicamentoId*
      const medicamentoIdInputs = document.querySelectorAll('input[name^="medicamentoId"]');
      const idValues = Array.from(medicamentoIdInputs).map(input => input.value.trim()).filter(value => value !== '');
  
      // Crear un diccionario para contar las ocurrencias de cada valor
      const idCounts = {};
      let idDuplicadas = false;
  
      idValues.forEach(id => {
          if (idCounts[id]) {
              idCounts[id]++;
              if (idCounts[id] > 1) {
                  idDuplicadas = true;
              }
          } else {
              idCounts[id] = 1;
          }
      });
  
      // Obtener el botón de acordeón con ID 'accordionButtonAdministracion'
      const accordionButton = document.getElementById('accordionButtonAdministracion');
      const submitBtn = document.getElementById('submitBtn');
      // Cambiar el color de fondo y el texto del botón según las condiciones
      if (allFilled && !idDuplicadas) {
          accordionButton.style.backgroundColor = 'lightgreen';
          accordionButton.innerText = 'Administracion Seleccionada';
          submitBtn.disabled = false;
      } else if (idDuplicadas) {
          accordionButton.style.backgroundColor = 'red';
          accordionButton.innerText = 'Nombres de campos Duplicados';
          submitBtn.disabled = true;
      } else {
          accordionButton.style.backgroundColor = '';
          accordionButton.innerText = 'Buscar Administracion';
          submitBtn.disabled = false;
      }
  }
  
    document.getElementById('diagnostico').addEventListener('input', function () {
      const text = this.value;
      const cleanedText = text.replace(/\s/g, ''); // Remove all spaces
      const button = document.getElementById('diagnosticoButton');
      const submitBtn = document.getElementById('submitBtn');
      
      if (cleanedText.length >= 10) {
          button.style.backgroundColor = 'lightgreen';
          submitBtn.disabled = false; // Enable the submit button
      } else {
          button.style.backgroundColor = '';
          submitBtn.disabled = true; // Disable the submit button
      }
  });

  let datosProfesional = null;

  function checkSelection1() {
      const checkboxes = document.querySelectorAll('#resultadosTabla1 tbody input[type="checkbox"]');
      const selectedCheckbox = Array.from(checkboxes).find(checkbox => checkbox.checked);
      const accordionButton = document.getElementById('accordionButton1');
  
      if (selectedCheckbox) {
          accordionButton.style.backgroundColor = 'lightgreen';
          accordionButton.innerText = 'Profesional Seleccionado';
  
          // Capturar la fila seleccionada y extraer los datos del profesional
          const row = selectedCheckbox.closest('tr');
          datosProfesional = {
              id_prof: row.cells[2].innerText,
              id_refer: row.cells[1].innerText,
              nombre_prof: row.cells[3].innerText,
              apellido_prof: row.cells[4].innerText,
              dni_prof: row.cells[5].innerText,
              domicilio_prof: row.cells[6].innerText,
              mail_prof: row.cells[7].innerText,
              matricula: row.cells[8].innerText,
              tel_prof: row.cells[9].innerText,
              tipo_esp: row.cells[10].innerText
          };
      } else {
          accordionButton.style.backgroundColor = '';
          accordionButton.innerText = 'Buscar Profesional';
          datosProfesional = null;
      }
  }

  document.getElementById('printButton').addEventListener('click', function() {
    const nombre_pas = document.getElementById('nombre_pas').value;
    const diagnostico = document.getElementById('diagnostico').value; // Captura otro valor
    const indicacion = document.getElementById('indicacion').value; // Captura otro valor

    // Capturar todos los campos dinámicos de "medicamento"
    let medicamentos = [];
    let i = 0;
    while (document.getElementById('datalist' + i)) {
        medicamentos.push(document.getElementById('datalist' + i).value);
        i++;
    }
       // Capturar todos los campos dinámicos de "prestaciones"
       let prestaciones = [];
       let j = 0;
       while (document.getElementById('datalista' + j)) {
           prestaciones.push(document.getElementById('datalista' + j).value);
           j++;
       }
     // Capturar todos los campos dinámicos de "medicamento", "dosis", "cantidad", "frecuencia" y "duracion"
     let administraciones = [];
     let z = 0;
     while (document.getElementById('medicamento' + z)) {
         let administracion = {
             medicamento: document.getElementById('medicamento' + z).value,
             dosis: document.getElementById('dosis' + z).value,
             cantidad: document.getElementById('cantidad' + z).value,
             frecuencia: document.getElementById('frecuencia' + z).value,
             duracion: document.getElementById('duracion' + z).value
         };
         administraciones.push(administracion);
         z++;
     }
     if (!datosProfesional) {
      alert('Por favor, seleccione un profesional antes de imprimir el PDF.');
      return;
  }
   
    fetch('/invoice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({  
            nombre_pas: nombre_pas,
            diagnostico: diagnostico,
            indicacion: indicacion,
            medicamentos: medicamentos, // Añadir el array de medicamentos
            administraciones:administraciones,
            datosProfesional:datosProfesional,
            prestaciones: prestaciones
          })
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'reseta.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Error:', error));
});

