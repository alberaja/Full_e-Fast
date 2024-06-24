package com.efast.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.efast.dto.PaymentRequest;
import com.efast.services.StripeService;
import com.stripe.exception.StripeException;

import io.swagger.v3.oas.annotations.Operation;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/efast/v1")
public class StripeController {
	
	@Autowired
    private StripeService stripeService;
	
	@Operation(summary = " endpoint para <CardElement /> ", description = " servicio para pagar con el custom Form que ofrece Stripe con 'CardElement' de Reactjs", tags = {})
	@PostMapping("/stripe-checkout") // @RequestMapping
	public String createCheckoutSession(@RequestBody PaymentRequest paymentRequest) throws StripeException {
        return stripeService.createCheckoutSession(paymentRequest);
    }
	
	@Operation(summary = " endpoint FINAL ", description = " servicio para pagar con el default Form plantilla que ofrece Stripe con 'PaymentElement' de Reactjs ", tags = {})
	@PostMapping("/stripe-checkout-2")
    public ResponseEntity<Map<String, String>> createCheckoutSession2(@RequestBody PaymentRequest paymentRequest) throws StripeException {
        return stripeService.createCheckoutSession2(paymentRequest);
    }
	
}
