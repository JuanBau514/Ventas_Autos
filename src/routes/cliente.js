const {Router} = require('express');
const router = Router();

const { getCliente, createCliente, getClienteById, deleteCliente, updateCliente } = require('../controllers/cliente.controller.js')

router.get('/cliente', getCliente);
router.get('/cliente/:id', getClienteById);
router.post('/cliente',createCliente);
router.delete('/cliente/:id', deleteCliente);
router.put('/cliente/:id',updateCliente);

module.exports = router;