require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// ── Middlewares ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Swagger ──────────────────────────────────────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SaaS de Cursos — API',
      version: '1.0.0',
      description:
        'API CRUD para plataforma SaaS de cursos. Professores postam materiais nos seus cursos.\n\n' +
        '**Disciplina:** Desenvolvimento de APIs  \n**Professor:** Pedro Borges  \n**Curso:** Sistemas de Informação',
    },
    servers: [{ url: process.env.BASE_URL || 'http://localhost:3000' }],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── Rotas ────────────────────────────────────────────────────────────────────
app.use('/api/cursos', require('./routes/cursos'));
app.use('/api/materiais', require('./routes/materiais'));

// Rota raiz — redireciona para docs
app.get('/', (req, res) => {
  res.redirect('/docs');
});

// ── Banco de dados + servidor ────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌  Defina MONGODB_URI no arquivo .env');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅  MongoDB conectado');
    app.listen(PORT, () =>
      console.log(`🚀  Servidor rodando em http://localhost:${PORT}\n📄  Docs: http://localhost:${PORT}/docs`)
    );
  })
  .catch((err) => {
    console.error('❌  Erro ao conectar MongoDB:', err.message);
    process.exit(1);
  });
