package com.efast.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.efast.dto.PaymentRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
 
@Service
public class StripeService {
	
	@Value("${stripe.key.secret}")
	String secretKey;
	
	private final String EUR = "eur";

	 public /*Map<String, String>*/ String createCheckoutSession( PaymentRequest paymentRequest   ) throws StripeException {
	        Stripe.apiKey = secretKey;

	        String YOUR_DOMAIN = "http://localhost:3000";
//	        SessionCreateParams params =
//	                SessionCreateParams.builder()
//	                        .setUiMode(SessionCreateParams.UiMode.EMBEDDED)
//	                        .setMode(SessionCreateParams.Mode.PAYMENT)
//	                        .setReturnUrl(YOUR_DOMAIN + "/return?session_id={CHECKOUT_SESSION_ID}")
//	                        // Define a product to sell.  https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=embedded-form#create-product-prices-upfront
//	                        .addLineItem(
//	                                SessionCreateParams.LineItem.builder()
//	                                        .setQuantity(1L)
//	                                        //.setPrice("{{PRICE_ID}}")    Cada producto tiene 1 precio, para cada precio se genera un PRICE_ID a setear aqui
//	                                        .setPrice("price_1PI6h0ACmPQ0R4zJ2qQUxMMq")
//	                                        .build())
//	                        .build();
//	        Session session = Session.create(params);
	        
//	        System.out.println("paymentMethodId: "+ paymentRequest.getPaymentMethodId());
//	        System.out.println("getReceiptEmail: "+ paymentRequest.getReceiptEmail());
	        System.out.println("getTotalAmount: "+ paymentRequest.getTotalAmount());
	     // Crear un PaymentIntent con el monto de la orden y la moneda
	        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
	                .setAmount(paymentRequest.getTotalAmount() * 100 )	// La API de Stripe lee con centimos y valor, osea 125 = 1,25$ . =cantidad /100. 10000=100€
	                .setCurrency(EUR) //usd
	                	.setPaymentMethod(paymentRequest.getPaymentMethodId())               
	                .setConfirmationMethod(PaymentIntentCreateParams.ConfirmationMethod.MANUAL)
	                .setConfirm(true)
	                .setReceiptEmail(paymentRequest.getReceiptEmail() /*paymentRequest.getBillingDetails().getEmail()*/) // opcional: agregar email para recibos
	                 .setReturnUrl("http://localhost:5173/index") // URL de retorno después del pago
	                .setDescription(paymentRequest.getDescription()) // "descripcion del pago del vehiculo"
	                .build();
//	        Map<String, String> map = new HashMap<>();
//	        map.put("clientSecret", session.getClientSecret());
//	        return map;
	        
	        PaymentIntent paymentIntent = PaymentIntent.create(params);

	        return "{ \"success\": true, \"paymentIntent\": " + paymentIntent.toJson() + " }";

	    }
		
		// ok para el default Form plantilla que ofrece Stripe con <PaymentElement>
		public ResponseEntity<Map<String, String>> createCheckoutSession2(
				PaymentRequest paymentRequest) throws StripeException {
			Stripe.apiKey = secretKey;

			if (paymentRequest.getTotalAmount() != null && paymentRequest.getDescription() != null
					&& paymentRequest.getReceiptEmail() != null) {
				try {
					// System.out.println("Stripe.apiKey: "+ Stripe.apiKey);
					PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
							.setAmount(paymentRequest.getTotalAmount() * 100).setCurrency(EUR)
							.setDescription(paymentRequest.getDescription())
							.setReceiptEmail(paymentRequest.getReceiptEmail())
							// .setPaymentMethod("pm_1PV6z6ACmPQ0R4zJUws1dVFS")
							.setConfirmationMethod(PaymentIntentCreateParams.ConfirmationMethod.AUTOMATIC) // necesario
																											// usando
																											// <PaymentElement>
							// In the latest version of the API, specifying the `automatic_payment_methods`
							// parameter is optional because Stripe enables its functionality by default.
//		                      .setAutomaticPaymentMethods(
//		                        PaymentIntentCreateParams.AutomaticPaymentMethods
//		                          .builder()
//		                          .setEnabled(true)
//		                          .build()
//		                      )
							.build();

					// Create a PaymentIntent with the order amount and currency
					PaymentIntent paymentIntent = PaymentIntent.create(params);

//		                // Guardar los datos del alquiler y del vehículo en la base de datos
//		                Rental rental = new Rental();
//		                rental.setDatosvehiculoElegido(paymentRequest.getDatosvehiculoElegido());
//		                rental.setRentalData(paymentRequest.getRentalData());
//		                rental.setPaymentIntentId(paymentIntent.getId());
//		                
//		                // Suponiendo que existe un servicio para manejar la persistencia
//		                rentalService.save(rental);

					Map<String, String> responseData = new HashMap<>();
					responseData.put("secret", paymentIntent.getClientSecret());

					return new ResponseEntity<>(responseData, HttpStatus.OK);
				} catch (StripeException e) {
					Map<String, String> errorResponse = new HashMap<>();
					errorResponse.put("error", e.getMessage());
					return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}

	   }
	

	
}