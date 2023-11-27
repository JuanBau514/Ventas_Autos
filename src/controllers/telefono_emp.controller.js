const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'concesionario',
    port: '5432'
});

const getCliente = async (req, res) => {
    const response = await pool.query('SELECT * FROM cliente');
    console.log(response.rows);
    res.status(200).json(response.rows);
}

const createCliente = async (req, res) => {
    const {id_cliente, nombre, ciudad, id_sucursal, fecha} = req.body;

    const response = await pool.query('INSERT INTO cliente (id_cliente, nombre, ciudad, id_sucursal, fecha) VALUES ($1, $2, $3, $4, $5)', [id_cliente, nombre, ciudad, id_sucursal, fecha]);
    console.log(response);
    res.json ({
        message: "Cliente agregado exitosamente",
        body: {
            sucursal: {id_cliente, nombre, ciudad, id_sucursal, fecha}
        }
    })
}

const updateCliente = async (req, res) => {
    const id = req.params.id;
    const { id_cliente, nombre, ciudad, id_sucursal, fecha } = req.body;
    const response = await pool.query(
        'UPDATE cliente SET id_cliente = $1, nombre = $2, ciudad = $3, id_sucursal = $4, fecha = $5 WHERE id_cliente = $6',
        [id_cliente, nombre, ciudad, id_sucursal, fecha, id]
    );
    console.log(response);
    res.send('Cliente Actualizado');
}


const deleteCliente = async (req, res) => {
    const id = req.params.id
    const response = await pool.query('DELETE FROM cliente WHERE id_cliente = $1', [id]);
    console.log(response);
    res.json('Cliente eliminado con exito');
}

const getClienteById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM cliente WHERE id_cliente = $1', [id]);
    res.json(response.rows);
}

module.exports= {
    getCliente,
    getClienteById,
    updateCliente,
    createCliente,
    deleteCliente
}