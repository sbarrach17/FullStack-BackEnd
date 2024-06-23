CREATE DATABASE proyecto;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    rut VARCHAR(20) NOT NULL UNIQUE 
);


CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    valor INT NOT NULL,
    url VARCHAR(255) NOT NULL,
    email_vendedor VARCHAR(255) NOT NULL,
);


CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    usuario_email VARCHAR(100) NOT NULL,
    producto_id INT NOT NULL,
    FOREIGN KEY (usuario_email) REFERENCES usuarios(email),
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

CREATE TABLE carro (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    rut VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    numero VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    comuna VARCHAR(100) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    domicilio VARCHAR(100) NOT NULL,
    departamento VARCHAR(100),
    metodoPago VARCHAR(100) NOT NULL,
    producto_id INT NOT NULL,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);