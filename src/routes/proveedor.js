const {Router} = require('express');
const router = Router();

const { getProveedor, createProveedor, getProveedorById, deleteProveedor, updateProveedor } = require('../controllers/proveedor.controller')

router.get('/proveedor', getProveedor);
router.get('/proveedor/:id', getProveedorById);
router.post('/proveedor',createProveedor);
router.delete('/proveedor/:id', deleteProveedor);
router.put('/proveedor/:id',updateProveedor);

module.exports = router;