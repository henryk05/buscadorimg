// excelHandlers.js
import { showAlert, checkRestrictedTerms } from './utils.js';
import { searchImagesFromSource } from '../services/imageService.js';

export const setupExcel = () => {
  const dropzone = document.getElementById('dropzone');
  
  // Drag & Drop
  dropzone.addEventListener('dragover', e => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    handleExcelFile(e.dataTransfer.files[0]);
  });

  document.getElementById('excelFile').addEventListener('change', e => {
    handleExcelFile(e.target.files[0]);
  });
};

async function handleExcelFile(file) {
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = async (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: ['SKU', 'NombreProducto'] });
    
    await processExcelData(rows.slice(1)); // Ignorar header
  };
  reader.readAsArrayBuffer(file);
}

async function processExcelData(rows) {
  const zip = new JSZip();
  let successCount = 0;
  
  for (const [index, row] of rows.entries()) {
    if (checkRestrictedTerms(row.NombreProducto)) {
      showAlert(`SKU ${row.SKU} restringido`, 'warning');
      continue;
    }
    
    try {
      const images = await searchImagesFromSource(row.NombreProducto);
      if (images.length === 0) throw new Error('Sin imágenes');
      
      const folder = zip.folder(row.SKU);
      images.forEach((img, i) => {
        folder.file(`image_${i + 1}.${img.url.split('.').pop()}`, fetch(img.url).then(res => res.blob()));
      });
      successCount++;
    } catch (error) {
      showAlert(`Error en SKU ${row.SKU}: ${error.message}`, 'error`);
    }
  }
  
  zip.generateAsync({ type: 'blob' }).then(content => {
    saveAs(content, `productos_${new Date().toISOString().slice(0, 10)}.zip`);
    showAlert(`Descarga completada: ${successCount}/${rows.length} SKUs procesados`, 'success`);
  });
}