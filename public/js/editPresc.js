function captureFormData() {
    const formData = {
      diagnostico: document.getElementById('diagnostico').value,
      indicacion: document.getElementById('indicacion').value,
      fecha_pres: document.getElementById('fecha_pres').value,
      nombre_pas: document.getElementById('nombre_pas').value,
      id_pas: document.getElementById('id_pas').value,
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
        id_medi: cells[0].innerText,
        prestacion: cells[1].innerText,
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
        a.download = 'prescription-data.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }