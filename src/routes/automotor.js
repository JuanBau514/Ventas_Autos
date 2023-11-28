const {Router} = require('express');
const router = Router();

const { getAutmotor, createAutomotor, getAutomotorById, deleteAutomotor, updateAutomotor } = require('../controllers/automotor.controller')

router.get('/automotor', getAutmotor);
router.get('/automotor/:id', getAutomotorById);
router.post('/automotor',createAutomotor);
router.delete('/automotor/:id', deleteAutomotor);
router.put('/automotor/:id',updateAutomotor);

module.exports = router;