export function initUI() {
  // Inicialización de eventos y UI
  document.querySelector('nav li:first-child').classList.add('active');
  mostrarSeccion('busquedaManual');
  
  // Configuración del Intersection Observer para lazy loading
  const observer = new IntersectionObserver(lazyLoadHandler, { rootMargin: '100px' });
  // ... configuración de observadores
}

function lazyLoadHandler(entries, observer) {
  // Lógica de lazy loading
}