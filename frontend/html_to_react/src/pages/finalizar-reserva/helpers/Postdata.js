export const PostData = async (reserva, conductor) => {
    try {
      const combinedPayload = { 
        reserva, 
        conductor };
      console.log("PostData() reserva parametros:", JSON.stringify(combinedPayload) )
      const response = await fetch('http://localhost:8762/mysql-efast/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },        
        body: JSON.stringify(combinedPayload),//JSON.stringify(reserva, conductor),
      });
  
     if (response.ok) {
        alert("Reserva realizada OK");
        console.log("respuesta:", response);
        //navigate("/"); // o history.push("/") si usas react-router-dom v5
        //return;
      } else {
        // Mostrar un mensaje de error al usuario con la información del error
        //console.log("status: ", response.status);
        if (response.status === 405) {
          alert("Vehiculo no disponible para alquilar! (Esta Alquilable=false)");
        }
        console.log("error", response);
      }
      
  
      //const data = await response.json();
      //setFetchedResults(data); // Aquí puedes manejar la respuesta de la llamada POST
    } catch (error) {
      console.error('Error al enviar la reserva:', error);
    }
  };