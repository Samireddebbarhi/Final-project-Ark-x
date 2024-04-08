const express = require('express');
const packRouter = express.Router();
const { addPack, getPack, updatePack, deletePack } = require('../../controllers/authControllers/Pack_Controller');


packRouter.post('/', addPack);
packRouter.get('/:id', getPack);
packRouter.put('/:id', updatePack);
packRouter.delete('/:id', deletePack);

module.exports = packRouter;

