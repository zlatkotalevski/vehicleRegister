package com.zt.vehicleregister.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.zt.vehicleregister.model.Vehicle;

public interface VehicleRepo extends JpaRepository<Vehicle, Integer> {
}
