const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'concesionario',
    port: '5432'
});

const getCompra = async (req, res) => {
    const response = await pool.query('SELECT * FROM compra');
    console.log(response.rows);
    res.status(200).json(response.rows);
}

const createCompra = async (req, res) => {
    const {id_compra, fecha_compra, valor, id_proveedor, id_sucursal} = req.body;

    const FechaComp = new Date(fecha_compra);

    const response = await pool.query('INSERT INTO compra (id_compra, fecha_compra, valor, id_proveedor, id_sucursal) VALUES ($1, $2, $3, $4, $5)', [id_compra, FechaComp, valor, id_proveedor, id_sucursal]);
    console.log(response);
    res.json ({
        message: "Compra agregada exitosamente",
        body: {
            sucursal: {id_compra, FechaComp, valor, id_proveedor, id_sucursal}
        }
    })
}

const updateCompra = async (req, res) => {
    const id = req.params.id;
    const { id_compra, fecha_compra, valor, id_proveedor, id_sucursal } = req.body;

    const FechaComp = new Date(fecha_compra);

    const response = await pool.query(
        'UPDATE compra SET id_compra = $1, fecha_compra = $2, valor = $3, id_proveedor = $4, id_sucursal = $5 WHERE id_compra = $6',
        [id_compra, FechaComp, valor, id_proveedor, id_sucursal, id]
    );
    console.log(response);
    res.send('Compra Actualizada');
}


const deleteCompra = async (req, res) => {
    const id = req.params.id
    const response = await pool.query('DELETE FROM compra WHERE id_compra = $1', [id]);
    console.log(response);
    res.json('Compra eliminada con exito');
}

const getCompraById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM compra WHERE id_compra = $1', [id]);
    res.json(response.rows);
}

module.exports= {
    getCompra,
    getCompraById,
    updateCompra,
    createCompra,
    deleteCompra
}