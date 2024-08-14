const express = require('express');
const cors = require('cors');
const connectDB = require('./db/conexion');
const Autenticacion = require('./routes/auth');
const VerificarToken = require('./routes/verificar_token');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth/users', Autenticacion);
app.use('/api/verificar-token', VerificarToken);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});