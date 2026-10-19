package com.example.back.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Testimonio {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String autora; // Acá guardamos si es Cami o Mili
    private String fechaLocal;
    private String categoria; // Ej: "Oración", "Testimonio"
    
    @Column(columnDefinition = "TEXT")
    private String contenido;
}