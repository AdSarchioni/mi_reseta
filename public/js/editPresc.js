function captureFormData() {
    const formData = {
      diagnostico: document.getElementById('diagnostico').value,
      indicacion: document.getElementById('indicacion').value,
      fecha_pres: document.getElementById('fecha_pres').value,
      nombre_prof: document.getElementById('nombre_prof').value,
      nombre_pas : document.getElementById('nombre_pas').value,
      sexo_pas: document.getElementById('sexo_pas').value,
      fecha_nac_pas: document.getElementById('fecha_nac_pas').value,
      dni_pas: document.getElementById('dni_pas').value,
      obra_social:document.getElementById('obra_social').value,
      refeps : document.getElementById('refeps').value,
      dni_prof : document.getElementById('dni_prof').value,
      matricula : document.getElementById('matricula').value,
      especialidad : document.getElementById('especialidad').value,
      telefono : document.getElementById('telefono').value,
      medicamentos: [],
      prestaciones: []
    };

    const medicamentosTable = document.getElementById('medicamentosTable');
    const medicamentosRows = medicamentosTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for (let row of medicamentosRows) {
      const cells = row.getElementsByTagName('td');
      formData.medicamentos.push({
        nombre_generico: cells[0].innerText.split(',')[0].trim(),
        nombre_comercial: cells[0].innerText.split(',')[1].trim(),
        concentracion: cells[1].innerText,
        presentacion: cells[2].innerText,
        familia: cells[3].innerText,
        forma_fa: cells[4].innerText,
        dosis: cells[5].innerText,
        frecuencia: cells[6].innerText,
        duracion: cells[7].innerText,
        cantidad: cells[8].innerText,
      });
    }

    const prestacionesTable = document.getElementById('prestacionesTable');
    const prestacionesRows = prestacionesTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for (let row of prestacionesRows) {
      const cells = row.getElementsByTagName('td');
      formData.prestaciones.push({
        prestacion: cells[0].innerText,
      });
    }

    fetch('/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'reseta.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }