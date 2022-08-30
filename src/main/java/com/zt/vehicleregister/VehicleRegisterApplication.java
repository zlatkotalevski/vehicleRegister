package com.zt.vehicleregister;

import org.springframework.amqp.core.Queue;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class VehicleRegisterApplication {

	public static void main(String[] args) {
		SpringApplication.run(VehicleRegisterApplication.class, args);
	}

	@Bean
	public Queue ekmtVehiclesQueue(){
		return new Queue("EkmtVehiclesQueue", false);
}
}
