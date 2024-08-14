const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/Cyber';

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('Conectado exitosamente a la base de datos MongoDB');
  } catch (error) {
    console.error('Error al conectar a la base de datos MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;