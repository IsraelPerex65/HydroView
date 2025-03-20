const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware para permitir CORS y parsear JSON
app.use(cors());
app.use(express.json());

// Variable para almacenar los últimos datos recibidos
let ultimosDatos = {
    ph: null,
    tds: null,
    temperatura: null
};

// Ruta GET para la raíz
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de sensores! Usa POST /datos-sensores para enviar datos y GET /ultimos-datos para ver los últimos valores.');
});

// Ruta POST para recibir datos de los sensores
app.post('/datos-sensores', (req, res) => {
    const { ph, tds, temperatura } = req.body;

    // Validar que los campos requeridos estén presentes
    if (ph === undefined || tds === undefined || temperatura === undefined) {
        return res.status(400).send('Datos incompletos');
    }

    // Almacenar los últimos datos recibidos
    ultimosDatos = { ph, tds, temperatura };

    // Mostrar los datos recibidos en la consola
    console.log('Datos recibidos:', ultimosDatos);

    // Responder con éxito
    res.status(200).send('Datos recibidos correctamente');
});

// Ruta GET para obtener los últimos datos recibidos
app.get('/ultimos-datos', (req, res) => {
    // Devolver los últimos datos almacenados
    res.status(200).json(ultimosDatos);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});