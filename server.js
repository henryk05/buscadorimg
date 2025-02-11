import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Rutas
app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});