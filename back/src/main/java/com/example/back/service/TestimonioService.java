package com.example.back.service;

import com.example.back.entity.Testimonio;
import com.example.back.repository.TestimonioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestimonioService {

    @Autowired
    private TestimonioRepository repository;

    public List<Testimonio> obtenerTodos() {
        return repository.findAll();
    }

    public List<Testimonio> obtenerPorAutora(String autora) {
        return repository.findByAutora(autora);
    }

    public List<Testimonio> guardarSincronizacion(List<Testimonio> testimoniosNuevos) {
        return repository.saveAll(testimoniosNuevos);
    }
}