const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'concesionario',
    port: '5432'
});

const getProveedor = async (req, res) => {
    const response = await pool.query('SELECT * FROM proveedor');
    console.log(response.rows);
    res.status(200).json(response.rows);
}

const createProveedor = async (req, res) => {
    const {id_proveedor, nombre, telefono} = req.body;

    const response = await pool.query('INSERT INTO proveedor (id_proveedor, nombre, telefono) VALUES ($1, $2, $3)', [id_proveedor, nombre, telefono]);
    console.log(response);
    res.json ({
        message: "Proveedor agregado exitosamente",
        body: {
            sucursal: {id_proveedor, nombre, telefono}
        }
    })
}

const updateProveedor = async (req, res) => {
    const id = req.params.id;
    const { id_proveedor, nombre, telefono } = req.body;
    const response = await pool.query(
        'UPDATE proveedor SET id_proveedor = $1, nombre = $2, telefono =$3 WHERE id_proveedor = $4',
        [id_proveedor, nombre, telefono, id]
    );
    console.log(response);
    res.send('Proveedor Actualizado');
}


const deleteProveedor = async (req, res) => {
    const id = req.params.id
    const response = await pool.query('DELETE FROM proveedor WHERE id_proveedor = $1', [id]);
    console.log(response);
    res.json('Proveedor eliminado con exito');
}

const getProveedorById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM proveedor WHERE id_proveedor = $1', [id]);
    res.json(response.rows);
}

module.exports= {
    getProveedor,
    getProveedorById,
    updateProveedor,
    createProveedor,
    deleteProveedor
}