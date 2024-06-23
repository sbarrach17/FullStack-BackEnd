-- FUNCION PARA INSERTAR USUARIOS
CREATE OR REPLACE FUNCTION insertar_usuario(
    p_nombre VARCHAR(100),
    p_apellido VARCHAR(100),
    p_email VARCHAR(100),
    p_password VARCHAR(100),
    p_rut VARCHAR(20)
) RETURNS VOID AS $$
BEGIN
   
    IF EXISTS (SELECT 1 FROM usuarios WHERE email = p_email) THEN
        RAISE EXCEPTION 'El email % ya está registrado', p_email;
    END IF;

    INSERT INTO usuarios (nombre, apellido, email, password, rut)
    VALUES (p_nombre, p_apellido, p_email, p_password, p_rut);

    RAISE NOTICE 'Usuario insertado correctamente';
END;
$$ LANGUAGE plpgsql;

-- FUNCION PARA VER LA VISTA DE LOS FAVORITOS POR USUARIO LOGUEADO

CREATE OR REPLACE VIEW favoritos_con_productos AS
SELECT
    f.id AS favorito_id,
    u.id AS usuario_id,
    u.email AS usuario_email,
    p.id AS producto_id,
    p.nombre AS producto_nombre,
    p.descripcion AS producto_descripcion,
    p.valor AS producto_valor,
    p.url AS producto_url,
    p.email AS vendedor_email
FROM favoritos f
JOIN usuarios u ON f.usuario_email = u.email
JOIN productos p ON f.producto_id = p.id;