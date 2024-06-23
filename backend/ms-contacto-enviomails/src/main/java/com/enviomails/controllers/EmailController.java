package com.enviomails.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.enviomails.dto.EmailyReservaRequest;
import com.enviomails.services.EmailService;

//@RequiredArgsConstructor
@RestController
@RequestMapping("/api/efast/v1")
public class EmailController {

	@Autowired
    private EmailService emailService;


    @PostMapping("/emails/enviar")
    public String sendTestReport(@RequestBody EmailyReservaRequest emailRequest) {
        return emailService.ServiceMail(emailRequest);
    }
  
}