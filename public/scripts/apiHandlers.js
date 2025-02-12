// apiHandlers.js
let apiToken = '';

export const setupAPI = () => {
  document.getElementById('btn-conectar').addEventListener('click', conectarAPI);
};

async function conectarAPI() {
  apiToken = document.getElementById('apiToken').value.trim();
  if (!apiToken) {
    showAlert('Por favor, ingresa tu token de API', 'error');
    return;
  }

  try {
    const response = await fetch(`/api/products?token=${encodeURIComponent(apiToken)}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    
    const data = await response.json();
    populateProductDropdown(data.products);
    showAlert('Conexión exitosa', 'success');
  } catch (error) {
    showAlert(`Error de conexión: ${error.message}`, 'error`);
    console.error('API Error:', error);
  }
}

function populateProductDropdown(products) {
  const dropdown = document.createElement('select');
  dropdown.id = 'productList';
  dropdown.innerHTML = products.map(product => 
    `<option value="${product.name}">${product.name}</option>`
  ).join('');
  
  dropdown.addEventListener('change', () => {
    document.getElementById('productName').value = dropdown.value;
  });
  
  document.getElementById('productListContainer').appendChild(dropdown);
}