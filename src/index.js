require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// ── Middlewares básicos ───────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Conexão MongoDB (cache para ambiente serverless) ──────────────────────────
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI não definida');
  await mongoose.connect(uri);
  isConnected = true;
}

// Garante conexão antes de qualquer rota
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ erro: 'Falha na conexão com banco', detalhe: err.message });
  }
});

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

// ── Rotas ─────────────────────────────────────────────────────────────────────
app.use('/api/cursos',    require('./routes/cursos'));
app.use('/api/materiais', require('./routes/materiais'));

app.get('/', (req, res) => res.redirect('/docs'));

// ── Local: sobe servidor normal. Vercel: exporta o app ───────────────────────
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  connectDB()
    .then(() =>
      app.listen(PORT, () =>
        console.log(`🚀  http://localhost:${PORT}\n📄  Docs: http://localhost:${PORT}/docs`)
      )
    )
    .catch((err) => {
      console.error('❌', err.message);
      process.exit(1);
    });
}

module.exports = app;
