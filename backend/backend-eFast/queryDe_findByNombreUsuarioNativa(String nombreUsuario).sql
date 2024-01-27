#  Dado 1 nombre de usuario, recupera todos los coches favoritos de ese usuario
use efast;
SELECT
        * 
    FROM
        efast.vehiculos_fav vf 
    JOIN
        usuarios u 
            ON vf.user_id = u.user_id 
    WHERE
        u.user_name = "Alberto"
        
# alias
       SELECT
        vf.*  
    FROM
        efast.vehiculos_fav vf 
    JOIN
        usuarios u 
            ON vf.user_id = u.user_id 
    WHERE
        u.user_name = "Alberto"      
        
        
 # query de  List<VehiculoFavorito> findByNombreUsuarioNativa( String nombreUsuario)       
        select
        u1_0.user_id,
        u1_0.last_name,
        r1_0.user_id,
        r1_1.rol_id,
        r1_1.nombre,
        u1_0.user_email,
        u1_0.user_name,
        u1_0.user_password,
        u1_0.user_phone 
    from
        usuarios u1_0 
    left join
        (usuarios_roles r1_0 
    join
        roles r1_1 
            on r1_1.rol_id=r1_0.rol_id) 
                on u1_0.user_id=r1_0.user_id 
        where
            u1_0.user_id=1  // user_id de Alberto
        
    /* ej respuesta:
        
        [
    {
        "idFav": 1,
        "vehicleFavId": {
            "vehicleId": 2,
            "vehicleName": "coche aja2",
            "vehicleDescription": "descripcion coche que inserto el 27/01/2024",
            "price": 5.00,
            "imageURI": "https://img.freepik.com/foto-gratis/vista-coche-3d_23-2150796896.jpg?w=1380&t=st=1706220401~exp=1706221001~hmac=ec07bc9e2a56df50c6bcc4f97e0628554c1c7a978759348a70124c9bfda30b62",
            "quantity": 2,
            "hibernateLazyInitializer": {}
        },
        "user": {
            "userId": 1,
            "userName": "Alberto",
            "lastName": "Jimenez",
            "userEmail": "albberto@mail.com",
            "userPassword": "12345",
            "userPhone": "600123456",
            "roles": [],
            "hibernateLazyInitializer": {}
        }
    }
]       */

#  Dado 1 nombre de usuario, recupera todos los coches favoritos de ese usuario
# aja: Deberia de ser
SELECT * FROM efast.usuarios;
	# ver los favs de cada usuario
SELECT * FROM efast.vehiculos_fav vf; #Salida:  ## id_fav, user_id, vehicle_id
												## '1', 	'1', 	'2'


# Resultado: Fila del coche2, ya que en efast.vehiculos_fav he marcado que al user 1 con u.user_name = "Alberto" le gusta el vehiculo 2
SELECT * FROM efast.vehiculos
		WHERE vehicle_id IN (
		(SELECT vf.vehicle_id 	#2
			FROM efast.vehiculos_fav vf 
			WHERE vf.user_id IN
			(SELECT u.user_id FROM  efast.usuarios u    WHERE  u.user_name = "Alberto") #1
		)
							);
      