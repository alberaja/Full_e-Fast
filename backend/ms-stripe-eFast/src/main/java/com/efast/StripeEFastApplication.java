package com.efast;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.efast")
public class StripeEFastApplication {
	public static void main(String[] args) {
		SpringApplication.run(StripeEFastApplication.class, args);
	}
}
