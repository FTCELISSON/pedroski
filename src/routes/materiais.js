const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/materialController');

/**
 * @swagger
 * tags:
 *   name: Materiais
 *   description: Materiais postados pelos professores
 */

/**
 * @swagger
 * /api/materiais:
 *   get:
 *     summary: Lista todos os materiais (ou filtra por curso)
 *     tags: [Materiais]
 *     parameters:
 *       - in: query
 *         name: cursoId
 *         schema:
 *           type: string
 *         description: Filtra materiais de um curso específico
 *     responses:
 *       200:
 *         description: Lista de materiais retornada com sucesso
 */
router.get('/', ctrl.listar);

/**
 * @swagger
 * /api/materiais/{id}:
 *   get:
 *     summary: Busca um material pelo ID
 *     tags: [Materiais]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Material encontrado
 *       404:
 *         description: Material não encontrado
 */
router.get('/:id', ctrl.buscarPorId);

/**
 * @swagger
 * /api/materiais:
 *   post:
 *     summary: Cria um novo material para um curso
 *     tags: [Materiais]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, tipo, url, cursoId]
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Aula 01 - Introdução ao React"
 *               descricao:
 *                 type: string
 *                 example: "Primeiros passos com React e JSX"
 *               tipo:
 *                 type: string
 *                 enum: [pdf, video, link, texto]
 *                 example: "video"
 *               url:
 *                 type: string
 *                 example: "https://youtube.com/watch?v=abc123"
 *               cursoId:
 *                 type: string
 *                 example: "665f1a2b3c4d5e6f7a8b9c0d"
 *     responses:
 *       201:
 *         description: Material criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', ctrl.criar);

/**
 * @swagger
 * /api/materiais/{id}:
 *   put:
 *     summary: Atualiza um material existente
 *     tags: [Materiais]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [pdf, video, link, texto]
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Material atualizado
 *       404:
 *         description: Material não encontrado
 */
router.put('/:id', ctrl.atualizar);

/**
 * @swagger
 * /api/materiais/{id}:
 *   delete:
 *     summary: Remove um material
 *     tags: [Materiais]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Material removido com sucesso
 *       404:
 *         description: Material não encontrado
 */
router.delete('/:id', ctrl.deletar);

module.exports = router;
