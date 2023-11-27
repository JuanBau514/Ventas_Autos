const {Router} = require('express');
const router = Router();

const { getTelefono, createTelefono, getTelefonoById, deleteTelefono, updateTelefono } = require('../controllers/telefono_cli.controller.js')

router.get('/telefonoCli', getTelefono);
router.get('/telefonoCli/:id', getTelefonoById);
router.post('/telefonoCli',createTelefono);
router.delete('/telefonoCli/:id', deleteTelefono);
router.put('/telefonoCli/:id',updateTelefono);

module.exports = router;