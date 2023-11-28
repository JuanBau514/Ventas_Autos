const {Router} = require('express');
const router = Router();

const { getCompra, createCompra, getCompraById, deleteCompra, updateCompra } = require('../controllers/compra.controller')

router.get('/compra', getCompra);
router.get('/compra/:id', getCompraById);
router.post('/compra',createCompra);
router.delete('/compra/:id', deleteCompra);
router.put('/compra/:id',updateCompra);

module.exports = router;