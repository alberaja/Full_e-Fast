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
            // Construir el correo
            Mail mail = buildMail(emailRequest);

            // Enviar el correo
            sendHTMLEmail(mail);

            responseMessage = "Request Successful \n";
        } catch (Exception e) {
            responseMessage = "Request Unsuccessful \n" + e.getMessage();
        }
        return responseMessage;
	}
	
	  private Mail buildMail(EmailyReservaRequest emailRequest) {
	        // Construir el correo
	        Mail mail = new MailBuilder()
	                .From("alberto.aja13@gmail.com")
	                .To(mailTo)
	                .Template("mail-template.html")
	                //añadir todos contenidos a reemplazar dentro del HTML por $clave.  ej: $content
//	                .AddContext(clave, valor)
//	                .AddContext("content", "Hola!")
	                .Subject("Contacto recibido desde el formulario de contacto de eFast.")
	                .createMail();

	        // Reemplazar las variables en el contenido del correo
	        String htmlContent = mail.getMailContent()
	                .replace("{{nombre}}", emailRequest.getNombre())
	                .replace("{{email}}", emailRequest.getEmail())
	                .replace("{{telefono}}", String.valueOf(emailRequest.getTelefono()))
	                .replace("{{comentarios}}", emailRequest.getComentarios());

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