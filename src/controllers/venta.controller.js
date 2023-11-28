const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'concesionario',
    port: '5432'
});

const getVenta = async (req, res) => {
    const response = await pool.query('SELECT * FROM venta');
    console.log(response.rows);
    res.status(200).json(response.rows);
}

const createVenta = async (req, res) => {
    const {id_venta, fecha_venta, valor, estado, metodo_pago, id_emp, no_chasis, id_cliente} = req.body;

    const FechaVen = new Date (fecha_venta);

    const response = await pool.query('INSERT INTO venta (id_venta, fecha_venta, valor, estado, metodo_pago, id_emp, no_chasis, id_cliente) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [id_venta, FechaVen, valor, estado, metodo_pago, id_emp, no_chasis, id_cliente]);
    console.log(response);
    res.json ({
        message: "Venta agregada exitosamente",
        body: {
            sucursal: {id_venta, FechaVen, valor, estado, metodo_pago, id_emp, no_chasis, id_cliente}
        }
    })
}

const updateVenta = async (req, res) => {
    const id = req.params.id;
    const {id_venta, fecha_venta, valor, estado, metodo_pago, id_emp, no_chasis, id_cliente} = req.body;

    const FechaVen = new Date (fecha_venta);

    const response = await pool.query(
        'UPDATE venta SET id_venta = $1, fecha_venta = $2, valor = $3, estado = $4, metodo_pago = $5, id_emp = $6, no_chasis =$7, id_cliente = $8 WHERE id_venta = $9',
        [id_venta, FechaVen, valor, estado, metodo_pago, id_emp, no_chasis, id_cliente, id]
    );
    console.log(response);
    res.send('Venta Actualizada');
}


const deleteVenta = async (req, res) => {
    const id = req.params.id
    const response = await pool.query('DELETE FROM venta WHERE id_venta = $1', [id]);
    console.log(response);
    res.json('Venta eliminada con exito');
}

const getVentaById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM venta WHERE id_venta = $1', [id]);
    res.json(response.rows);
}

module.exports= {
    getVenta,
    getVentaById,
    updateVenta,
    createVenta,
    deleteVenta
}