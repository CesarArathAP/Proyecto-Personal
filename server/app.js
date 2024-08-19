const express = require('express');
const cors = require('cors');
const connectDB = require('./db/conexion');
const Autenticacion = require('./routes/auth');
const SolicitarToken = require('./routes/solicitar_token');
const VerificarToken = require('./routes/verificar_token');
const resetPasswordRoutes = require('./routes/reset_password');
const SaveTokenRoute = require('./routes/save_token');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth/users', Autenticacion);
app.use('/api/solicitar-token', SolicitarToken);
app.use('/api/verificar_token', VerificarToken);
app.use('/api/reset_password', resetPasswordRoutes);
app.use('/api/save-token', SaveTokenRoute);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});