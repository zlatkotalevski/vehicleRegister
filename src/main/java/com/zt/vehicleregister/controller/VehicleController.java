package com.zt.vehicleregister.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zt.vehicleregister.dao.VehicleRepo;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.zt.vehicleregister.model.Vehicle;
import com.zt.vehicleregister.model.VehiclesHolder;

import java.util.List;

@RestController
public class VehicleController {
    @Autowired
    VehicleRepo vehicleRepo;
    @Autowired
    RabbitTemplate rabbitTemplate;

    @GetMapping("/getVehicles")
    public String getVehicles() throws JsonProcessingException {
        final ObjectMapper mapper = new ObjectMapper();
        final VehiclesHolder holder = new VehiclesHolder();
        holder.setData(vehicleRepo.findAll());
        return mapper.writeValueAsString(holder);
    }

    @GetMapping("/getVehicle")
    public List<Vehicle> getVehicle()  {
        return vehicleRepo.findAll();
    }

    @PutMapping("/addVehicle")
    public Vehicle saveVehicle(Vehicle vehicle) {
        System.out.println(vehicle.getRegNumber());
        rabbitTemplate.convertAndSend("EkmtVehiclesQueue", "Почитувани, \n\nВе известуваме дека на ден " + vehicle.getDateIssued() + " извршен e ЕКМТ преглед на возилото со регистарски таблички: " + vehicle.getRegNumber() +".\n\nСо почит.\nЗлатко Талевски");
        return this.vehicleRepo.saveAndFlush(vehicle);
        }

    @DeleteMapping("/deleteVehicle{id}")
    public void deleteVehicle(Vehicle vehicle){
        this.vehicleRepo.deleteById(vehicle.getId());
    }

    @PostMapping("/editVehicle{id}")
    public Vehicle editVehicle(Vehicle vehicle){
        return this.vehicleRepo.saveAndFlush(vehicle);
    }

    }