package com.weatherwise.model;

import lombok.Data;
import java.util.List;

@Data
public class WeatherData {
    private Main main;
    private List<Weather> weather;
    private String name;
    private Wind wind;
    private long dt;
    private Sys sys;
}
