const {Router} = require('express');
const router = Router();

const { getEmpleado, createEmpleado, getEmpleadoById, deleteEmpleado, updateEmpleado } = require('../controllers/empleado.controller')

router.get('/empleado', getEmpleado);
router.get('/empleado/:id', getEmpleadoById);
router.post('/empleado',createEmpleado);
router.delete('/empleado/:id', deleteEmpleado);
router.put('/empleado/:id',updateEmpleado);

module.exports = router;