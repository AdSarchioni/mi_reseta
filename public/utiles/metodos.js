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