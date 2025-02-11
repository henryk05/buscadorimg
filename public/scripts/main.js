import { initUI } from './uiHandlers.js';
import { setupSearch } from './searchHandlers.js';
import { setupExcel } from './excelHandlers.js';
import { setupAPI } from './apiHandlers.js';

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  setupSearch();
  setupExcel();
  setupAPI();
});