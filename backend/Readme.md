# Full_e-Fast

Breve descripción del proyecto.

## Instalación

Instrucciones sobre cómo instalar y configurar el proyecto localmente.

## Uso

Cómo utilizar el proyecto, incluyendo ejemplos de código y ejemplos de casos de uso.

## Endpoints

### Elastic: 

#### Endpoint 1: Obtener todos los usuarios

- **URL:** `/api/efast/v1/vehicles`
- **Método:** GET
- **Descripción:** Este endpoint devuelve todos los vehiculos disponibles en alquiler en el sistema.
- **Parámetros de consulta:** //Ninguno.
- **Respuesta exitosa:**
  ```json
  [
    {
      "id": 1,
      "nombre": "Ejemplo 1",
      "email": "ejemplo1@example.com"
    },
    {
      "id": 2,
      "nombre": "Ejemplo 2",
      "email": "ejemplo2@example.com"
    }
  ]

**Recursos identificados:**
- Vehiculo (vehicles): Representa un vehiculo del sitema.
/*- Préstamo (loans): Representa un préstamo de un libro a un usuario.
- Usuario (users): Representa un usuario de la biblioteca.
- Reporte (reports): Representa un reporte de los libros prestados a un usuario.
  */

  - Todos ednpoint cuelgan de: /api/efast/v1/

| Método HTTP                            | URI                   | Query Params  | Cuerpo de la Petición                                              | Cuerpo de la Respuesta                                                                | Códigos de Respuesta                                    |
|----------------------------------------|-----------------------|---------------|--------------------------------------------------------------------|---------------------------------------------------------------------------------------|---------------------------------------------------------|
| GET                                    | /vehiculos                | title, author | N/A                                                                | `{"books": [{"id": 789, "title": "RESTful Design", "author": "John Doe"}]}`           | 200 OK<br/>400 Bad Request<br/>500 Internal Server Error   |
| POST                                   | /loans                | N/A           | `{"userId": 123, "bookId": 789, "dueDate": "2023-08-01"}`          | `{"loanId": 321, "userId": 123, "bookId": 789, "dueDate": "2023-08-01"}`              | 201 Created<br/>400 Bad Request<br/>500 Internal Server Error |


### MySQL: 

### e-Mail: 

