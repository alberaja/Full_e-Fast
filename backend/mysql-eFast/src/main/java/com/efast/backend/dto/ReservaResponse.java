package com.efast.backend.dto;

import com.efast.backend.model.Conductor;
import com.efast.backend.model.Reserva;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
//@Schema(name = "", description = "")
public class ReservaResponse {

    private Reserva reserva;
    private Conductor conductor;

}
