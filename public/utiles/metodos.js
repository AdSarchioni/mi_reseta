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












 // Paso 2 y 3: Insertar las administraciones y las asociaciones en `presc_admin`
 for (let admin of administraciones) {
    const [adminResult] = await conexion.query(
        'INSERT INTO administracion (id_dosis, id_frecuencia, id_cantidad, id_duracion, id_med) VALUES (?, ?, ?, ?, ?)',
        [admin.id_dosis, admin.id_frecuencia, admin.id_cantidad, admin.id_duracion, admin.id_med]
    );
    const id_admin = adminResult.insertId;

    await conexion.query(
        'INSERT INTO presc_admin (id_presc, id_admin) VALUES (?, ?)',
        [id_presc, id_admin]
    );
}