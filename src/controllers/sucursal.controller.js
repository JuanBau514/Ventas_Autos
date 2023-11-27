const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'concesionario',
    port: '5432'
});

const getSucursal = async (req, res) => {
    const response = await pool.query('SELECT * FROM sucursal');
    console.log(response.rows);
    res.status(200).json(response.rows);
}

const createSucursal = async (req, res) => {
    const {id_sucursal, ciudad, nombre} = req.body;

    const response = await pool.query('INSERT INTO sucursal (id_sucursal, ciudad, nombre) VALUES ($1, $2, $3)', [id_sucursal, ciudad, nombre]);
    console.log(response);
    res.json ({
        message: "Sucursal agregada exitosamente",
        body: {
            sucursal: {id_sucursal, ciudad, nombre}
        }
    })
}

const updateSucursal = async (req, res) => {
    const id = req.params.id;
    const {id_sucursal, ciudad, nombre} = req.body;
    const response = await pool.query('UPDATE sucursal SET id_sucursal = $1, ciudad = $2, nombre = $3 WHERE id_sucursal = $4',[
        id,
        ciudad,
        nombre,
        id_sucursal
    ]);
    console.log(response);
    res.send('Sucursal Actualizada');
}

const deleteSucursal = async (req, res) => {
    const id = req.params.id
    const response = await pool.query('DELETE FROM sucursal WHERE id_sucursal = $1', [id]);
    console.log(response);
    res.json('Sucursal eliminada con exito');
}

const getSucursalById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM sucursal WHERE id_sucursal = $1', [id]);
    res.json(response.rows);
}

module.exports= {
    getSucursal,
    getSucursalById,
    updateSucursal,
    createSucursal,
    deleteSucursal
}