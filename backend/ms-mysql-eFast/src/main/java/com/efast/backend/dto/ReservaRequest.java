package com.efast.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ReservaRequest {

    private ReservaDTO reserva;
    private ConductorDTO conductor;

}
