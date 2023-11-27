\c postgres
DROP DATABASE If EXISTS concesionario ;
CREATE DATABASE concesionario;
\c concesionario

CREATE TABLE sucursal(
    id_sucursal INT NOT NULL,
    ciudad VARCHAR(20) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_sucursal)
);

CREATE TABLE cliente (
    id_cliente INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    ciudad VARCHAR(20) NOT NULL,
    id_sucursal INT NOT NULL,
    fecha DATE NOT NULL, 
    PRIMARY KEY (id_cliente),
    Foreign Key (id_sucursal) REFERENCES sucursal(id_sucursal)
);

CREATE Table telefono_cli (
    id_cliente INT NOT NULL,
    id_tel INT NOT NULL,
    PRIMARY KEY (id_cliente, id_tel),
    Foreign Key (id_cliente) REFERENCES cliente(id_cliente)
);

CREATE Table empleado (
    id_emp INT NOT NULL,
    documento INT NOT NULL,
    fecha_nto DATE  NOT NULL,
    fecha_in DATE  NOT NULL,
    nombre VARCHAR(50),
    salario  DECIMAL NOT NULL,
    sucursal INT NOT NULL,
    cargo VARCHAR(30),
    PRIMARY KEY (id_emp),
    Foreign Key (sucursal) REFERENCES sucursal(id_sucursal)
);

CREATE TABLE telefono_emp (
    id_emp INT NOT NULL,
    id_tel INT NOT NULL,
    PRIMARY KEY (id_emp,id_tel),
    Foreign Key (id_emp) REFERENCES empleado(id_emp)
);

CREATE TABLE proveedor (
    id_proveedor INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    telefono INT NOT NULL,
    PRIMARY KEY (id_proveedor)
);

CREATE TABLE compra (
    id_compra INT NOT NULL,
    fecha_compra DATE NOT NULL,
    valor DECIMAL NOT NULL,
    id_proveedor INT NOT NULL,
    id_sucursal INT NOT NULL,
    PRIMARY KEY (id_compra),
    Foreign Key (id_proveedor) REFERENCES proveedor(id_proveedor),
    Foreign Key (id_sucursal) REFERENCES sucursal(id_sucursal)
);

CREATE TABLE automotor (
    no_chasis INT NOT NULL,
    modelo VARCHAR (20) NOT NULL,
    color VARCHAR (20) NOT NULL,
    linea VARCHAR (20) NOT NULL,
    tipo VARCHAR (20) NOT NULL,
    marca VARCHAR (30) NOT NULL,
    id_compra INT NOT NULL,
    id_u_n INT NOT NULL,
    PRIMARY KEY (no_chasis),
    Foreign Key (id_compra) REFERENCES compra(id_compra)
);

CREATE Table venta (
    id_venta INT NOT NULL,
    fecha_venta DATE NOT NULL,
    valor DECIMAL NOT NULL,
    estado VARCHAR(20) NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL,
    id_emp INT NOT NULL,
    no_chasis INT NOT NULL,
    id_cliente INT NOT NULL,
    PRIMARY KEY (id_venta),
    Foreign Key (id_emp) REFERENCES empleado(id_emp),    
    Foreign Key (no_chasis) REFERENCES automotor(no_chasis),
    Foreign Key (id_cliente) REFERENCES cliente(id_cliente)
);

--Secuencias
CREATE SEQUENCE seq_id_compra INCREMENT BY 1 START 1 MAXVALUE 999999999;
ALTER TABLE compra ALTER COLUMN id_compra SET DEFAULT nextval('seq_id_compra');
CREATE SEQUENCE seq_id_venta INCREMENT BY 1 START 1 MAXVALUE 999999999;
ALTER TABLE venta ALTER COLUMN id_venta SET DEFAULT nextval('seq_id_venta');
--Datos

--Datos sucursal
INSERT INTO sucursal (id_sucursal, ciudad, nombre)
VALUES
(1, 'Bogota', 'Sucursal Centro'),
(2, 'Riohacha', 'Sucursal Norte'),
(3, 'Sincelejo', 'Sucursal Sur'),
(4, 'Cartagena', 'Sucursal Este'),
(5, 'Medellin', 'Sucursal Medellín'),
(6, 'Manizales', 'Sucursal Manizales'),
(7, 'Cali', 'Sucursal Cali'),
(8, 'Villavicencio', 'Sucursal Villavicencio'),
(9, 'Popayán', 'Sucursal Popayán'),
(10, 'Pasto', 'Sucursal Pasto'),
(11, 'Leticia', 'Sucursal Leticia');


--Datos cliente
INSERT INTO cliente VALUES (1,'Pedro Rodriguez','Bogota',1,'2020-5-11');

--Datos telefono_cli
INSERT INTO telefono_cli VALUES (1,'311275524');
INSERT INTO telefono_cli VALUES (1,'311274443');

--Datos empleado
INSERT INTO empleado VALUES (1,1200023,'2003-12-29','2023-11-01','Andrea Perez',1160000,'1','Vendedor');
INSERT INTO empleado VALUES (2,1300023,'2000-12-22','2023-11-01','Pedro Alvarez',1160000,'1','Gerente');
INSERT INTO empleado VALUES (3,1400023,'1999-1-29','2023-11-01','Estela Mal',1160000,'2','Vendedor');
INSERT INTO empleado VALUES (4,1500023,'2001-8-14','2023-11-01','Mery Tabarro',1160000,'2','Gerente');
INSERT INTO empleado VALUES (5,1600023,'1980-9-29','2023-11-01','Sandra Valdez',1160000,'3','Vendedor');
INSERT INTO empleado VALUES (6,1700023,'1987-4-29','2023-11-01','Alfedro Molano',1160000,'3','Gerente');
INSERT INTO empleado VALUES (7,1800023,'2004-5-29','2023-11-01','Jorge Lukas',1160000,'4','Vendedor');
INSERT INTO empleado VALUES (8,1900023,'1992-6-03','2023-11-01','Kentaro Miura',1160000,'4','Gerente');
INSERT INTO empleado VALUES (9,1010023,'1997-7-07','2023-11-01','Yoshigiro Togashi',1160000,'5','Vendedor');
INSERT INTO empleado VALUES (10,1020023,'2003-7-05','2023-11-01','Neli Lopez',1160000,'5','Gerente');
INSERT INTO empleado VALUES (11,1030023,'1973-8-29','2023-11-01','Fabian Maecha',1160000,'6','Vendedor');
INSERT INTO empleado VALUES (12,1040023,'2000-10-29','2023-11-01','Leonard Euler',1160000,'6','Gerente');
INSERT INTO empleado VALUES (13,1050023,'1970-9-01','2023-11-01','Mayerli Jimenez',1160000,'7','Vendedor');
INSERT INTO empleado VALUES (14,1060023,'1999-1-17','2023-11-01','Marta Vanegas',1160000,'7','Gerente');
INSERT INTO empleado VALUES (15,1070023,'1989-2-21','2023-11-01','Julian Menezes',1160000,'8','Vendedor');
INSERT INTO empleado VALUES (16,1070023,'1966-2-23','2023-11-01','Carlos Casas',1160000,'8','Gerente');
INSERT INTO empleado VALUES (17,1080023,'1990-3-29','2023-11-01','Pitagoras',1160000,'9','Vendedor');
INSERT INTO empleado VALUES (18,1001023,'1972-4-25','2023-11-01','Rene Descartes',1160000,'9','Gerente');
INSERT INTO empleado VALUES (19,1002023,'2003-5-29','2023-11-01','Wilhelm Leibniz',1160000,'10','Vendedor');
INSERT INTO empleado VALUES (20,1003023,'2002-6-29','2023-11-01','Ada Lovelace',1160000,'10','Gerente');
INSERT INTO empleado VALUES (21,1004023,'1990-4-30','2023-11-01','Emmy Noether',1160000,'11','Vendedor');
INSERT INTO empleado VALUES (22,1005023,'1980-6-29','2023-11-01','Carl Gauss',1160000,'11','Gerente');
INSERT INTO empleado VALUES (123456789,999999,'2000-1-01','2000-1-01','Concesionario',1160000,'1','Admin');
--Datos telefono_emp
INSERT INTO telefono_emp VALUES (1,398614020);
INSERT INTO telefono_emp (id_emp, id_tel) VALUES
(2, 312324567),
(3, 313467890),
(4, 314678901),
(5, 316789012),
(6, 317890123),
(7, 317890123),
(8, 318901235),
(9, 319012356),
(10, 320124567),
(11, 321245678),
(12, 322456789),
(13, 324567890),
(14, 324567890),
(15, 325678902),
(16, 326789023),
(17, 327890234),
(18, 328902345),
(19, 329023456),
(20, 319323456),
(21, 330523456);

--Datos proveedor
INSERT INTO proveedor (id_proveedor, nombre, telefono) VALUES
(1, 'Toyota', 312321567),
(2, 'Honda', 313456890),
(3, 'Nissan', 314568901),
(4, 'Renault', 315689012),
(5, 'Chevrolet', 316890123),
(6, 'Mazda', 317890234),
(7, 'Kia', 318901245),
(8, 'Hyundai', 319123456),
(9, 'Volkswagen', 320234567),
(10, 'Ford', 321234578);

--Datos compra
INSERT INTO compra ( fecha_compra, valor, id_proveedor, id_sucursal) VALUES
('2023-11-18', 30000000, 1,1),
('2023-11-17', 25000000, 2,2),
('2023-11-16', 20000000, 3,3),
('2023-11-15', 15000000, 4,4),
('2023-11-14', 10000000, 5,5),
('2023-11-13', 5000000, 6,6),
('2023-11-12', 4000000, 7,7),
('2023-11-11', 3000000, 8,8),
('2023-11-10', 2000000, 9,9),
('2023-11-09', 1000000, 10,10);

--Datos automotor
INSERT INTO automotor (no_chasis, modelo, color, linea, tipo, marca, id_compra, id_u_n) VALUES
(123456789, 'Corolla Cross', 'Blanco', 'SUV', 'Particular', 'Toyota', 1, 101),
(987654320, 'City', 'Gris', 'Sedán', 'Particular', 'Honda', 2, 102),
(012345689, 'Kicks', 'Negro', 'SUV', 'Particular', 'Nissan', 3, 103),
(123456891, 'Duster', 'Rojo', 'SUV', 'Particular', 'Renault', 4, 104),
(987653212, 'Onix', 'Azul', 'Sedán', 'Particular', 'Chevrolet', 5, 105),
(012356782, 'Picanto', 'Blanco', 'Hatchback', 'Particular', 'Kia', 6, 106),
(123567893, 'Creta', 'Plateado', 'SUV', 'Particular', 'Hyundai', 7, 107),
(986543213, 'T-Cross', 'Rojo', 'SUV', 'Particular', 'Volkswagen', 8, 108),
(023456783, 'Ranger', 'Negro', 'Camioneta', 'Particular', 'Ford', 9, 109),
(234567894, 'Hilux', 'Blanco', 'Camioneta', 'Particular', 'Toyota', 10, 110);

--Datos venta
INSERT INTO venta (
  fecha_venta,
  valor,
  estado,
  metodo_pago,
  id_emp,
  no_chasis,
  id_cliente
) VALUES
('2023-11-18', 30000000, 'Pendiente', 'Tarjeta de crédito', 3,123456789, 1);

--Vistas

--Vista proveedor
CREATE VIEW mostrarProveedor AS SELECT * from proveedor;
--Vista sucursal
CREATE VIEW mostrarSucursal AS SELECT * from sucursal;

--Vista empleado
CREATE VIEW mostrarEmplado AS SELECT * from empleado;


--Vista reporte 1
CREATE VIEW reporte1 AS
select * from cliente
where extract(month from  fecha)=extract(month from  now())-1 AND 
extract(year from  fecha)=extract(year from  now());

--Vista reporte 2
CREATE VIEW reporte2_1 AS
SELECT marca,COUNT(marca) from automotor aut INNER JOIN venta ven ON(aut.no_chasis=ven.no_chasis) 
WHERE extract(month from  fecha_venta)=extract(month from  now())-1 AND 
extract(year from  fecha_venta)=extract(year from  now()) GROUP BY marca ;

CREATE VIEW reporte2_2 AS
SELECT marca,COUNT(marca) from automotor aut INNER JOIN venta ven ON(aut.no_chasis=ven.no_chasis)
WHERE extract(year from  fecha_venta)=extract(year from  now())-1 GROUP BY marca ;

--Vista reporte 5
CREATE VIEW reporte5 AS
SELECT sucursal, cargo,
    id_emp, nombre,
    MAX(fecha_in) AS fecha_in
FROM empleado
GROUP BY sucursal, id_emp, nombre
ORDER BY sucursal, cargo, fecha_in DESC;
/*
--Consulta reporte 3
SELECT * FROM cliente WHERE extract(year from  fecha)=2020 AND extract(month from  fecha)=5 ORDER BY id_sucursal DESC;

--Consulta reporte 4
SELECT emp.sucursal, aut.marca, COUNT(aut.marca)  from automotor aut INNER JOIN venta ven ON(aut.no_chasis=ven.no_chasis) INNER JOIN empleado emp ON(ven.id_emp=emp.id_emp) WHERE extract(month from  ven.fecha_venta)=$1 GROUP BY aut.marca ,emp.sucursal ORDER BY aut.marca;
*/
--Procedimientos almacenados

--Procedimiento compra de autos
CREATE Function comprarAuto(
    id_pro INT,
    nombre_pro VARCHAR (50),
    valor_com DECIMAL,
    id_suc INT,
    no_chasis INT,
    modelo VARCHAR(20),
    color VARCHAR(20),
    linea VARCHAR(20),
    tipo VARCHAR(20),
    marca VARCHAR(30),
    id_u_n INT
)
RETURNS VOID AS $$
DECLARE fecha DATE;
BEGIN
    IF EXISTS( SELECT pr.id_proveedor from proveedor pr where pr.id_proveedor=id_pro
    )THEN 
        fecha := TO_DATE(TO_CHAR(Now(), 'YYYY-MM-DD'), 'YYYY-MM-DD');
        INSERT INTO compra (fecha_compra, valor, id_proveedor, id_sucursal) VALUES (fecha, valor_com, id_pro, id_suc);        
        INSERT INTO automotor (no_chasis, modelo, color, linea, tipo, marca, id_compra, id_u_n) VALUES 
        (no_chasis, modelo,color, linea, tipo, marca, currval('seq_id_compra'), id_u_n);
    ELSE
        RAISE NOTICE 'El proveedor no existe.';
    END IF;
END;
$$ LANGUAGE plpgsql;

--Procedimiento insertar cliente
CREATE Function insCliente (
    id_cli INT,
    nom_cli VARCHAR(50),
    cui_cli VARCHAR(50),
    id_suc INT,
    id_tel INT
)
RETURNS VOID AS $$
DECLARE fecha DATE;
BEGIN
    IF EXISTS( SELECT id_cliente FROM cliente WHERE id_cliente=id_cli
    )THEN 
        RAISE NOTICE 'El cliente ya existe.';
    ELSE
        fecha := TO_CHAR(Now(), 'YYYY-MM-DD');
        INSERT INTO cliente VALUES (id_cli,nom_cli,cui_cli,id_suc,fecha);
        INSERT INTO telefono_cli VALUES (id_cli,id_tel);
    END IF;
END;
$$ LANGUAGE plpgsql;

--Procedimiento inertar empleado 
CREATE Function insEmpleado (
    id_empl INT,
    doc_emp INT,
    fech_nto_emp date,
    fech_in_emp date,
    nom_emp VARCHAR(50),
    sal_emp DECIMAL,
    id_suc INT,
    car_emp varchar (30),
    id_tel INT
)
RETURNS VOID AS $$
BEGIN
    IF EXISTS( SELECT em.id_emp FROM empleado em WHERE em.id_emp=id_empl
    )THEN 
        RAISE NOTICE 'El empleado ya existe.';
    ELSE 
        IF (car_emp !='Gerente')
        THEN
            INSERT INTO empleado VALUES (id_empl,doc_emp,fech_nto_emp,fech_in_emp,nom_emp,sal_emp,id_suc,car_emp);
            INSERT INTO telefono_emp VALUES (id_empl,id_tel);    
        ELSE
            IF EXISTS( SELECT em.id_emp FROM empleado em 
            WHERE em.sucursal=id_suc AND em.cargo='Gerente' AND car_emp='Gerente'
            )THEN 
                RAISE NOTICE 'La sucursal ya pose un gerente, no puede tener 2.';
            ELSE 
                INSERT INTO empleado VALUES (id_empl,doc_emp,fech_nto_emp,fech_in_emp,nom_emp,sal_emp,id_suc,car_emp);
                INSERT INTO telefono_emp VALUES (id_emp,id_tel);
                RAISE NOTICE 'El empleado fue agregado.';
            END IF;    
        END IF;    
    END IF;
END;
$$ LANGUAGE plpgsql;

--procedimeinto vender automotor
CREATE FUNCTION venderAutomotor (
    val_ven DECIMAL,
    estado VARCHAR(20),
    met_pag_ven VARCHAR(50),
    id_empl INT,
    no_chasis_ INT,
    id_cli INT
)
RETURNS VOID AS $$
DECLARE fecha DATE;
BEGIN
    IF EXISTS( SELECT id_cliente FROM cliente  WHERE id_cliente=id_cli
    )THEN 
        IF EXISTS( SELECT em.id_emp FROM empleado em WHERE em.id_emp=id_empl
        )THEN 
            IF EXISTS( SELECT au.no_chasis FROM automotor au WHERE au.no_chasis=no_chasis_
            )THEN 
                fecha := TO_CHAR(Now(), 'YYYY-MM-DD');
                INSERT INTO venta (fecha_venta,valor,estado,metodo_pago,id_emp,no_chasis,id_cliente) VALUES (fecha, val_ven, estado, met_pag_ven, id_empl, no_chasis_, id_cli);
            ELSE        
                RAISE NOTICE 'El automotor no existe.';
            END IF;
        ELSE        
            RAISE NOTICE 'El empleado no existe.';
        END IF;
    ELSE        
        RAISE NOTICE 'El cliente no existe.';
    END IF;
END;
$$ LANGUAGE plpgsql;
