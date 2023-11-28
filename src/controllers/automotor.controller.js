const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'concesionario',
    port: '5432'
});

const getAutmotor = async (req, res) => {
    const response = await pool.query('SELECT * FROM automotor');
    console.log(response.rows);
    res.status(200).json(response.rows);
}

const createAutomotor = async (req, res) => {
    const {no_chasis, modelo, color, linea, tipo, marca, id_compra, id_u_n} = req.body;

    const response = await pool.query('INSERT INTO automotor (no_chasis, modelo, color, linea, tipo, marca, id_compra, id_u_n) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [no_chasis, modelo, color, linea, tipo, marca, id_compra, id_u_n]);
    console.log(response);
    res.json ({
        message: "Automotor agregado exitosamente",
        body: {
            sucursal: {no_chasis, modelo, color, linea, tipo, marca, id_compra, id_u_n}
        }
    })
}

const updateAutomotor = async (req, res) => {
    const id = req.params.id;
    const { no_chasis, modelo, color, linea, tipo, marca, id_compra, id_u_n } = req.body;
    const response = await pool.query(
        'UPDATE automotor SET no_chasis = $1, modelo = $2, color = $3, linea = $4, tipo = $5, marca = $6, id_compra = $7, id_u_n = $8 WHERE no_chasis = $9',
        [no_chasis, modelo, color, linea, tipo, marca, id_compra, id_u_n, id]
    );
    console.log(response);
    res.send('Automotor Actualizado');
}


const deleteAutomotor = async (req, res) => {
    const id = req.params.id
    const response = await pool.query('DELETE FROM automotor WHERE no_chasis = $1', [id]);
    console.log(response);
    res.json('Automotor eliminado con exito');
}

const getAutomotorById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM automotor WHERE no_chasis = $1', [id]);
    res.json(response.rows);
}

module.exports= {
    getAutmotor,
    getAutomotorById,
    updateAutomotor,
    createAutomotor,
    deleteAutomotor
}