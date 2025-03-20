const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Usa el puerto de Render o 3000 como respaldo

// Middleware para permitir CORS y parsear JSON
app.use(cors());
app.use(express.json());

// Variable para almacenar los últimos datos recibidos
let ultimosDatos = {
    ph: null,
    tds: null,
    temperatura: null
};

// Variable para el estado de los sensores
let sensoresEncendidos = true; // Por defecto, los sensores están encendidos

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

// Ruta GET para encender los sensores
app.get('/encender-sensores', (req, res) => {
    sensoresEncendidos = true;
    console.log('Sensores encendidos');
    res.status(200).json({ mensaje: 'Sensores encendidos' });
});

// Ruta GET para apagar los sensores
app.get('/apagar-sensores', (req, res) => {
    sensoresEncendidos = false;
    console.log('Sensores apagados');
    res.status(200).json({ mensaje: 'Sensores apagados' });
});

// Ruta GET para obtener el estado de los sensores
app.get('/estado-sensores', (req, res) => {
    res.status(200).json({ sensoresEncendidos });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});