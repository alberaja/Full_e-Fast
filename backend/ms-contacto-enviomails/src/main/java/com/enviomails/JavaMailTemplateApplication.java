package com.enviomails;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.enviomails")
public class JavaMailTemplateApplication {
	public static void main(String[] args) {
		SpringApplication.run(JavaMailTemplateApplication.class, args);
	}
}
