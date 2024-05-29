//funcion para cargar data list medicamentos
async function fetchMedicamentos() {
    try {
      const response = await fetch('/medicamentos');
      const data = await response.json();
      console.log('Received medicamentos:', JSON.stringify(data)); // Verificar los datos recibidos
  
      const datalist = document.getElementById('datalistOptions');
      datalist.innerHTML = ''; // Clear existing options
      data.forEach(item => {
        const option = document.createElement('option');
        option.value = `${item.nombre_comercial}-${item.concentracion}-${item.forma_farma}`;
        datalist.appendChild(option);
      });
    } catch (error) {
      console.error('Error fetching medicamentos:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('exampleDataList');
    input.addEventListener('focus', fetchMedicamentos); // Carga los medicamentos al hacer clic en el input
  });

  function agregarCamposBusqueda() {
    const cantidadMedicamentos = document.getElementById('cantidadMedicamentos').value;
    const contenedorBusquedaMedicamentos = document.getElementById('contenedorBusquedaMedicamentos');
  
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
  
      const dataList = document.createElement('datalist');
      dataList.id = `datalistOptions${i}`;
  
      inputGroup.appendChild(input);
      inputGroup.appendChild(dataList);
      contenedorBusquedaMedicamentos.appendChild(inputGroup);
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
  
  document.addEventListener('DOMContentLoaded', () => {
    const cantidadMedicamentos = document.getElementById('cantidadMedicamentos');
    const botonAgregar = document.querySelector('button[type="button"]');
  
   
   
   
   
   
    botonAgregar.addEventListener('click', () => {
      const cantidad = parseInt(cantidadMedicamentos.value);
      for (let i = 0; i < cantidad; i++) {
        const datalistId = `datalistOptions${i}`;
        fetchMedicamentos(datalistId);
      }
    });
  });



  document.getElementById('administrationCount').addEventListener('input', function() {
    const count = parseInt(this.value);
    const container = document.getElementById('accordionContainer');
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        accordionItem.innerHTML = `
            <h2 class="accordion-header" id="heading${i}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                    Administración ${i + 1}
                </button>
            </h2>
            <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}" data-bs-parent="#accordionContainer">
                <div class="accordion-body">
                    <div class="row g-3">
                        <div class="col-sm">
                            <input type="text" class="form-control" placeholder="Dosis" aria-label="Dosis" list="dosisList${i}">
                            <datalist id="dosisList${i}">
                                <!-- Opciones de Dosis -->
                                <option value="Dosis 1">
                                <option value="Dosis 2">
                            </datalist>
                        </div>
                        <div class="col-sm">
                            <input type="text" class="form-control" placeholder="Cantidad" aria-label="Cantidad" list="cantidadList${i}">
                            <datalist id="cantidadList${i}">
                                <!-- Opciones de Cantidad -->
                                <option value="Cantidad 1">
                                <option value="Cantidad 2">
                            </datalist>
                        </div>
                        <div class="col-sm">
                            <input type="text" class="form-control" placeholder="Frecuencia" aria-label="Frecuencia" list="frecuenciaList${i}">
                            <datalist id="frecuenciaList${i}">
                                <!-- Opciones de Frecuencia -->
                                <option value="Frecuencia 1">
                                <option value="Frecuencia 2">
                            </datalist>
                        </div>
                        <div class="col-sm">
                            <input type="text" class="form-control" placeholder="Duración" aria-label="Duracion" list="duracionList${i}">
                            <datalist id="duracionList${i}">
                                <!-- Opciones de Duración -->
                                <option value="Duración 1">
                                <option value="Duración 2">
                            </datalist>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(accordionItem);
    }
});


document.getElementById('administrationCount').addEventListener('input', function() {
  const count = parseInt(this.value);
  const container = document.getElementById('inputsContainer');
  container.innerHTML = '';

  for (let i = 0; i < count; i++) {
      const inputGroup = document.createElement('div');
      inputGroup.className = 'row g-3 mb-3';
      inputGroup.innerHTML = `
          <div class="col-sm">
              <input type="text" class="form-control" placeholder="Medicamento ${i + 1}" aria-label="Medicamento">
          </div>
          <div class="col-sm">
              <input type="text" class="form-control" placeholder="Dosis" aria-label="Dosis" list="dosisList${i}">
              <datalist id="dosisList${i}">
                  <!-- Opciones de Dosis -->
                  <option value="Dosis 1">
                  <option value="Dosis 2">
              </datalist>
          </div>
          <div class="col-sm">
              <input type="text" class="form-control" placeholder="Cantidad" aria-label="Cantidad" list="cantidadList${i}">
              <datalist id="cantidadList${i}">
                  <!-- Opciones de Cantidad -->
                  <option value="Cantidad 1">
                  <option value="Cantidad 2">
              </datalist>
          </div>
          <div class="col-sm">
              <input type="text" class="form-control" placeholder="Frecuencia" aria-label="Frecuencia" list="frecuenciaList${i}">
              <datalist id="frecuenciaList${i}">
                  <!-- Opciones de Frecuencia -->
                  <option value="Frecuencia 1">
                  <option value="Frecuencia 2">
              </datalist>
          </div>
          <div class="col-sm">
              <input type="text" class="form-control" placeholder="Duración" aria-label="Duración" list="duracionList${i}">
              <datalist id="duracionList${i}">
                  <!-- Opciones de Duración -->
                  <option value="Duración 1">
                  <option value="Duración 2">
              </datalist>
          </div>
      `;
      container.appendChild(inputGroup);
  }
});