require('dotenv').config({ path: 'src/.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5200;


// Suponiendo que tienes estos archivos y rutas correctamente definidos
const preguntas = require('./routes/preguntasRoutes.js');
const pruebas = require('./routes/pruebasRoutes.js');

// Configuración de CORS para permitir solicitudes de cualquier origen
app.use(cors({
  origin: '*', // Permite todas las fuentes
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204
}));

// Parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación de gestión de profesores!');
});

app.post('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación de gestión de profesores!');
});

app.put('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación de gestión de profesores!');
});


app.set('trust proxy', true); // trust first proxy

// Ruta de whatsapp

app.use('/api/preguntas', preguntas);

// Ruta para pruebas

app.use('/api/pruebas', pruebas);
// Manejo de errores

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Algo salió mal' });
});

app.use((req, res, next) => {
  res.status(404).send({ error: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});


