package com.enviomails.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.enviomails.dto.EmailyReservaRequest;
import com.enviomails.services.EmailService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

//@RequiredArgsConstructor
@RestController
@RequestMapping("/api/efast/v1")
@Tag(name = "send email", description = "API Documentation for sending HTML template contact form using Google SMTP service in eFast web app")
public class EmailController {

	@Autowired
    private EmailService emailService;


	@Operation(summary = " endpoint to send email", description = " email endpoint. ", tags = {})
    @PostMapping("/emails/enviar")
    public String sendEmail(@RequestBody EmailyReservaRequest emailRequest) {
        return emailService.ServiceMail(emailRequest);
    }
  
}