const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    descricao: { type: String, default: '' },
    tipo: {
      type: String,
      enum: ['pdf', 'video', 'link', 'texto'],
      required: true,
    },
    url: { type: String, required: true },
    cursoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Curso',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Material', materialSchema);
