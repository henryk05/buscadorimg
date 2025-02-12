// services/imageService.js
export const searchImagesFromSource = async (query, options = {}) => {
  const { fileType = 'png', start = 1, limit = 8 } = options;

  // Simulación de búsqueda de imágenes (reemplaza con tu lógica real)
  const images = Array.from({ length: limit }, (_, index) => ({
    url: `https://source.unsplash.com/random/300x300?${query}&${start + index}`,
    title: `Imagen ${start + index} de ${query}`,
  }));

  return images;
};