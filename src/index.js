require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ erro: 'Falha na conexão com o banco', detalhe: err.message });
  }
});

// ── Swagger via CDN (sem depender do swagger-ui-express) ──────────────────────
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SaaS de Cursos — API',
      version: '1.0.0',
      description:
        'API CRUD para plataforma SaaS de cursos.\n\n' +
        '**Disciplina:** Desenvolvimento de APIs | **Professor:** Pedro Borges | **Curso:** Sistemas de Informação',
    },
    servers: [{ url: process.env.BASE_URL || 'http://localhost:3000' }],
  },
  apis: ['./src/routes/*.js'],
});

// Entrega o JSON da spec
app.get('/docs/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

// Entrega o HTML do Swagger via CDN
app.get('/docs', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>SaaS de Cursos — API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"/>
  <style>
    body { margin: 0; background: #fafafa; }
    .topbar { display: none !important; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({
      url: '/docs/swagger.json',
      dom_id: '#swagger-ui',
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
      layout: 'BaseLayout',
      deepLinking: true,
    });
  </script>
</body>
</html>`);
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
