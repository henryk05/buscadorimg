// utils.js
export const showAlert = (message, type = 'info') => {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 5000);
};

export const checkRestrictedTerms = (query) => {
  const restrictedTerms = ["sex shop", "pornografia", "juguetes sexuales"];
  return restrictedTerms.some(term => query.toLowerCase().includes(term));
};

export const formatFilename = (url, index) => {
  const ext = url.split('.').pop().split(/[?#]/)[0];
  return `image_${index + 1}.${ext}`;
};

export const lazyLoadImages = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '100px' });
  
  document.querySelectorAll('.lazy-image').forEach(img => observer.observe(img));
};