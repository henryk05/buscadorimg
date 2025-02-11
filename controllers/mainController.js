import { searchImagesFromSource } from '../services/imageService.js';

export const searchImages = async (req, res) => {
  try {
    const { query, fileType = 'png', start = 1, limit = 8 } = req.query;
    const results = await searchImagesFromSource(query, { fileType, start, limit });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  // Lógica para obtener productos de la API
};