// main.js
import { initUI } from './uiHandlers.js';
import { setupSearch } from './searchHandlers.js';
import { setupExcel } from './excelHandlers.js';
import { setupAPI } from './apiHandlers.js';
import { lazyLoadImages } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  setupSearch();
  setupExcel();
  setupAPI();
  lazyLoadImages();
});