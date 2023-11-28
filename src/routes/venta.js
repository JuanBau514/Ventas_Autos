const {Router} = require('express');
const router = Router();

const { getVenta, createVenta, getVentaById, deleteVenta, updateVenta } = require('../controllers/venta.controller')

router.get('/venta', getVenta);
router.get('/venta/:id', getVentaById);
router.post('/venta',createVenta);
router.delete('/venta/:id', deleteVenta);
router.put('/venta/:id',updateVenta);

module.exports = router;