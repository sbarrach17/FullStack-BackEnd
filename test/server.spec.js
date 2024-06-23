const request = require("supertest");
const app = require("../index");


describe("PRUEBA DE RUTAS CARRO Y PRODUCTOS", () => {
    it("DEBE DEVOLVER ERROR SI FALTAN CAMPOS", async () => {
        const newCarItem = {
            nombre: "Sebastian",
            // FALTA APELLIDO
            rut: "12345678-9",
            email: "sebastian.barra@ejemplo.com",
            // FALTA NUMERO
            region: "Region Metropolitana",
            comuna: "Santiago",
            direccion: "Calle",
            domicilio: "Casa",
            departamento: "",
            metodoPago: "Tarjeta de Crédito",
            producto_id: 1,
        };
        const response = await request(app)
            .post("/carro")
            .send(newCarItem);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "Todos los campos requeridos deben ser proporcionados");
    }, 10000); 


    it("MOSTRAR TODOS LOS PRODUCTOS", async () => {
        const response = await request(app).get("/productos");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("DEBE AGREGAR UN NUEVO PRODUCTO", async () => {
        const newProduct = {
            nombre: "prueba",
            descripcion: "Descripción del producto de prueba",
            valor: 100000,
            url: "http://ejemplo.com/productoEjemplo.jpg",
            email: "s.andresbarra@gmail.com"
        };
        const response = await request(app)
            .post("/productos")
            .send(newProduct);
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Producto agregado con exito");
        const products = await request(app).get("/productos");
        const product = products.body.find(p => p.nombre === newProduct.nombre);
        productId = product.id;
    });
    it("DEBE ELIMNAR UN PRODUCTO", async () => {
        const response = await request(app)
            .delete(`/productos/${productId}`);

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Producto eliminado exitosamente");

        // Verifica que el producto ha sido eliminado
        const products = await request(app).get("/productos");
        const product = products.body.find(p => p.id === productId);
        expect(product).toBeUndefined();
    });
    
});


