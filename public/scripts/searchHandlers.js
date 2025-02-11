export function setupSearch() {
  document.getElementById('productName').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchImages();
  });
  
  window.searchImages = async function() {
    // Lógica de búsqueda...
  };
}