package com.weatherwise.model;

import lombok.Data;

@Data
public class City {
    private int id;
    private String name;
    private com.weatherwise.model.Coord coord;
    private String country;
    private int timezone;
    private int sunrise;
    private int sunset;
}
