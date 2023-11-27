const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'concesionario',
    port: '5432'
});

const getTelefono = async (req, res) => {
    const response = await pool.query('SELECT * FROM telefono_cli');
    console.log(response.rows);
    res.status(200).json(response.rows);
}

const createTelefono = async (req, res) => {
    const {id_cliente, id_tel} = req.body;

    const response = await pool.query('INSERT INTO telefono_cli (id_cliente, id_tel) VALUES ($1, $2)', [id_cliente, id_tel]);
    console.log(response);
    res.json ({
        message: "Telefono del Cliente agregado exitosamente",
        body: {
            sucursal: {id_cliente, id_tel}
        }
    })
}

const updateTelefono = async (req, res) => {
    const id = req.params.id;
    const { id_cliente, id_tel } = req.body;
    const response = await pool.query(
        'UPDATE telefono_cli SET id_cliente = $1, id_tel = $2 WHERE id_cliente = $3',
        [id_cliente, id_tel, id]
    );
    console.log(response);
    res.send('Telefono Actualizado');
}


const deleteTelefono = async (req, res) => {
    const id = req.params.id
    const response = await pool.query('DELETE FROM telefono_cli WHERE id_cliente = $1', [id]);
    console.log(response);
    res.json('Telefono eliminado con exito');
}

const getTelefonoById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM telefono_cli WHERE id_cliente = $1', [id]);
    res.json(response.rows);
}

module.exports= {
    getTelefono,
    getTelefonoById,
    updateTelefono,
    createTelefono,
    deleteTelefono
}