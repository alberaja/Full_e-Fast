export const PostdataReservaFinalizada = async (payloadBody) => {
    try {      
      console.log("PostdataContactForm() formContacto parametros:", JSON.stringify(payloadBody) )
      // sustituyo el elemento 'terminos' que recibo, por el de 'esReserva'
      const transformData = (payloadBody) => {
        return {
          email: payloadBody || "",
          esReserva: true //payloadBody.terminos || false
        };
      };

          //ok console.log("transformData:"+ JSON.stringify(transformData(payloadBody)));
      const response = await fetch('http://localhost:8762/contacto-enviomails/api/efast/v1/emails/enviar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },        
        body: JSON.stringify(transformData(payloadBody)),
      });
  
     if (response.ok) {
        //console.log("Formulario de contacto enviado OK. respuesta:", response);
        return "exito";
        //showAlertSucess();
        // { <p style={{ color: "red", textAlign: "center" }}>Formulario de contacto enviado OK</p> }
      } else {
        // Mostrar un mensaje de error al usuario con la información del error
        //console.log("status: ", response.status);
        if (response.status === 405) {
          return "KO";
        }
        return "KO: "+ response;
      }      
  
     
    } catch (error) {
      console.error('Error al enviar el formulario de contacto:', error);
    }
  };