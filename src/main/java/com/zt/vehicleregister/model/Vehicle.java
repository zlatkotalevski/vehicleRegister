package com.zt.vehicleregister.model;

import lombok.Data;

import javax.persistence.*;


@Data
@Entity
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private int id;
     private String ekmtNumber;
     private String regNumber;
     private String ekmtCert;
     private String make;
     private String type;
     private String vin;
     private String engineType;
     private String engineNumber;
     private String dateIssued;
     private String validDate;

}
