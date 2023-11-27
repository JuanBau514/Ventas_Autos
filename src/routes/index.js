const {Router} = require('express');
const router = Router();

const { getSucursal, createSucursal, getSucursalById, deleteSucursal, updateSucursal } = require('../controllers/index.controller.js')

router.get('/sucursal', getSucursal);
router.get('/sucursal/:id', getSucursalById);
router.post('/sucursal',createSucursal);
router.delete('/sucursal/:id', deleteSucursal);
router.put('/sucursal/:id',updateSucursal);

module.exports = router;