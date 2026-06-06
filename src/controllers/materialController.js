const Material = require('../models/Material');

// CREATE
exports.criar = async (req, res) => {
  try {
    const material = await Material.create(req.body);
    res.status(201).json(material);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// READ ALL (pode filtrar por cursoId via query ?cursoId=xxx)
exports.listar = async (req, res) => {
  try {
    const filtro = req.query.cursoId ? { cursoId: req.query.cursoId } : {};
    const materiais = await Material.find(filtro)
      .populate('cursoId', 'titulo professor')
      .sort({ createdAt: -1 });
    res.json(materiais);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// READ ONE
exports.buscarPorId = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id).populate(
      'cursoId',
      'titulo professor'
    );
    if (!material)
      return res.status(404).json({ erro: 'Material não encontrado' });
    res.json(material);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// UPDATE
exports.atualizar = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!material)
      return res.status(404).json({ erro: 'Material não encontrado' });
    res.json(material);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// DELETE
exports.deletar = async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material)
      return res.status(404).json({ erro: 'Material não encontrado' });
    res.json({ mensagem: 'Material removido com sucesso' });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};
