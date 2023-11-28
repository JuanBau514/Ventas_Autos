const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'concesionario',
    port: '5432'
});

const getEmpleado = async (req, res) => {
    const response = await pool.query('SELECT * FROM empleado');
    console.log(response.rows);
    res.status(200).json(response.rows);
}

const createEmpleado = async (req, res) => {
    const { id_emp, documento, fecha_nto, fecha_in, nombre, salario, sucursal, cargo } = req.body;

    // Convertir las cadenas de fecha a objetos de fecha
    const fechaNto = new Date(fecha_nto);
    const fechaIn = new Date(fecha_in);

    // Asegúrate de proporcionar un valor para fecha_nto
    const response = await pool.query(
        'INSERT INTO empleado (id_emp, documento, fecha_nto, fecha_in, nombre, salario, sucursal, cargo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [id_emp, documento, fechaNto, fechaIn, nombre, salario, sucursal, cargo]
    );

    console.log(response);
    res.json({
        message: "Empleado creado exitosamente",
        body: {
            sucursal: {id_emp, documento, fecha_nto, fecha_in, nombre, salario, sucursal, cargo}
        }
    });
}

const updateEmpleado = async (req, res) => {
    const id = req.params.id;
    const { id_emp, documento, fecha_nto, fecha_in, nombre, salario, sucursal, cargo } = req.body;

    // Convertir las cadenas de fecha a objetos de fecha
    const fechaNto = new Date(fecha_nto);
    const fechaIn = new Date(fecha_in);

    const response = await pool.query(
        'UPDATE empleado SET id_emp = $1, documento = $2, fecha_nto = $3, fecha_in = $4 , nombre = $5 , salario = $6, sucursal = $7 , cargo = $8 WHERE id_emp = $9',
        [id_emp, documento, fechaNto, fechaIn, nombre, salario, sucursal, cargo, id]
    );
    console.log(response);
    res.send('Empleado Actualizado');
}


const deleteEmpleado = async (req, res) => {
    const id = req.params.id
    const response = await pool.query('DELETE FROM empleado WHERE id_emp = $1', [id]);
    console.log(response);
    res.json('Empleado eliminado con exito');
}

const getEmpleadoById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM empleado WHERE id_emp = $1', [id]);
    res.json(response.rows);
}

module.exports= {
    getEmpleado,
    getEmpleadoById,
    updateEmpleado,
    createEmpleado,
    deleteEmpleado
}