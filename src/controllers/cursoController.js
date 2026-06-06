const Curso = require('../models/Curso');

// CREATE
exports.criar = async (req, res) => {
  try {
    const curso = await Curso.create(req.body);
    res.status(201).json(curso);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// READ ALL
exports.listar = async (req, res) => {
  try {
    const cursos = await Curso.find().sort({ createdAt: -1 });
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// READ ONE
exports.buscarPorId = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) return res.status(404).json({ erro: 'Curso não encontrado' });
    res.json(curso);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// UPDATE
exports.atualizar = async (req, res) => {
  try {
    const curso = await Curso.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!curso) return res.status(404).json({ erro: 'Curso não encontrado' });
    res.json(curso);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// DELETE
exports.deletar = async (req, res) => {
  try {
    const curso = await Curso.findByIdAndDelete(req.params.id);
    if (!curso) return res.status(404).json({ erro: 'Curso não encontrado' });
    res.json({ mensagem: 'Curso removido com sucesso' });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};
