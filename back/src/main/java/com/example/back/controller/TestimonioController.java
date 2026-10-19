package com.example.back.controller;

import com.example.back.entity.Testimonio;
import com.example.back.service.TestimonioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonios")
@CrossOrigin(origins = "*") 
public class TestimonioController {

    @Autowired
    private TestimonioService service;

    // GET /api/testimonios o GET /api/testimonios?autora=Cami
    @GetMapping
    public ResponseEntity<List<Testimonio>> obtenerTestimonios(@RequestParam(required = false) String autora) {
        if (autora != null && !autora.isEmpty()) {
            return ResponseEntity.ok(service.obtenerPorAutora(autora));
        }
        return ResponseEntity.ok(service.obtenerTodos());
    }

    // POST /api/testimonios/sync 
    @PostMapping("/sync")
    public ResponseEntity<String> sincronizarTestimonios(@RequestBody List<Testimonio> testimoniosNuevos) {
        service.guardarSincronizacion(testimoniosNuevos);
        return ResponseEntity.ok("¡Sincronización exitosa de " + testimoniosNuevos.size() + " testimonios!");
    }
}