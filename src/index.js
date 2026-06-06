require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

app.use(cors());
app.use(express.json());

// ── Conexão MongoDB (cache para serverless) ───────────────────────────────────
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
}

// ── Swagger ───────────────────────────────────────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SaaS de Cursos — API',
      version: '1.0.0',
      description:
        'API CRUD para plataforma SaaS de cursos.\n\n' +
        '**Disciplina:** Desenvolvimento de APIs  \n**Professor:** Pedro Borges  \n**Curso:** Sistemas de Informação',
    },
    servers: [{ url: process.env.BASE_URL || 'http://localhost:3000' }],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── Middleware de conexão (antes das rotas) ───────────────────────────────────
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ erro: 'Falha na conexão com o banco', detalhe: err.message });
  }
});

// ── Rotas ─────────────────────────────────────────────────────────────────────
app.use('/api/cursos',    require('./routes/cursos'));
app.use('/api/materiais', require('./routes/materiais'));

app.get('/', (req, res) => res.redirect('/docs'));

// ── Local vs Vercel ───────────────────────────────────────────────────────────
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  connectDB()
    .then(() => app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}/docs`)))
    .catch(console.error);
}

module.exports = app;
