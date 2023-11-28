const express = require('express');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/sucursal'));
app.use(require('./routes/cliente'));
app.use(require('./routes/telefono_cli'));
app.use(require('./routes/empleado'));
app.use(require('./routes/telefono_emp'));
app.use(require('./routes/proveedor'));
app.use(require('./routes/compra'));
app.use(require('./routes/automotor'));
app.use(require('./routes/venta'));

app.listen(3000);
console.log('server on port 3000');
