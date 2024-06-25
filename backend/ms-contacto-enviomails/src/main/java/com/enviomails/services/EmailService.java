package com.enviomails.services;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.enviomails.builders.MailBuilder;
import com.enviomails.dto.EmailyReservaRequest;
import com.enviomails.models.Mail;
 
@Service
public class EmailService {
	
	@Value("${mail.to}")
	private String mailTo; // = "alberto.aja13@gmail.com";
	
	@Autowired
	private JavaMailSender mailSender;	
	
	// para junit test
	public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
	
	public String ServiceMail(EmailyReservaRequest emailRequest) {
		String responseMessage;
        try {
        	String subject = "Contacto recibido desde el formulario de contacto de eFast.";
        	if(emailRequest.isEsReserva()){ subject = "¡¡¡Te confirmamos que hemos recibo tu reserva!!!";}
        	
            // Construir el correo
            Mail mail = buildMail(emailRequest, subject);

            // Enviar el correo
            sendHTMLEmail(mail);

            responseMessage = "Request Successful \n";
        } catch (Exception e) {
            responseMessage = "Request Unsuccessful \n" + e.getMessage();
        }
        return responseMessage;
	}
	
	  private Mail buildMail(EmailyReservaRequest emailRequest, String subject) {
		  //if(emailRequest.isEsReserva()){ mailTo = emailRequest.getEmail(); }
		  
	        // Construir el correo
	        Mail mail = new MailBuilder()
	                .From("alberto.aja13@gmail.com")
	                .To( emailRequest.isEsReserva() ? emailRequest.getEmail() : mailTo)
	                .Template(emailRequest.isEsReserva() ? "mail-confirmarreserva.html"  : "mail-cotactus.html")
	                //añadir todos contenidos a reemplazar dentro del HTML por $clave.  ej: $content
//	                .AddContext(clave, valor)
//	                .AddContext("content", "Hola!")
	                .Subject(subject) //"Contacto recibido desde el formulario de contacto de eFast."
	                .createMail();

	        String htmlContent = "";
	        if(emailRequest.getNombre() != null) {
	        	// form de contacto
	        // Reemplazar las variables en el contenido del correo
	        htmlContent = mail.getMailContent()
	                .replace("{{nombre}}", emailRequest.getNombre())
	                .replace("{{email}}", emailRequest.getEmail())
	                .replace("{{telefono}}", String.valueOf(emailRequest.getTelefono()))
	                .replace("{{comentarios}}", emailRequest.getComentarios());
	        } else {
	        	//confirmar reservas
	        	htmlContent = mail.getMailContent();
	        }

	        // Establecer el contenido HTML modificado en el objeto Mail
	        mail.setMailContent(htmlContent);
	        return mail;
	    }
	
	public void sendHTMLEmail(Mail message) throws MessagingException {
		MimeMessage emailMessage = mailSender.createMimeMessage();
		MimeMessageHelper mailBuilder = new MimeMessageHelper(emailMessage, true);
		mailBuilder.setTo(message.getMailTo());
		mailBuilder.setFrom(message.getMailFrom());			
		mailBuilder.setText(message.getMailContent(), true);
		mailBuilder.setSubject(message.getMailSubject());
		mailSender.send(emailMessage);
	}
	
	
}