const {Router} = require('express');
const router = Router();

const { getTelefono, createTelefono, getTelefonoById, deleteTelefono, updateTelefono } = require('../controllers/telefono_emp.controller')

router.get('/telefonoEmp', getTelefono);
router.get('/telefonoEmp/:id', getTelefonoById);
router.post('/telefonoEmp',createTelefono);
router.delete('/telefonoEmp/:id', deleteTelefono);
router.put('/telefonoEmp/:id',updateTelefono);

module.exports = router;