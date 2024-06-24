package com.efast.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class PaymentRequest {
    private Long totalAmount;
    private String receiptEmail;
    private String paymentMethodId;
    private String description;

}
