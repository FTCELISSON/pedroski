const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    descricao: { type: String, required: true },
    professor: { type: String, required: true, trim: true },
    categoria: { type: String, default: 'Geral' },
    ativo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Curso', cursoSchema);
