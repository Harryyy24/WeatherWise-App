package com.weatherwise.model;

import lombok.Data;
import java.util.List;

@Data
public class WeatherForecast {
    private String cod;
    private double message;
    private int cnt;
    private List<com.weatherwise.model.Forecast> list;
    private com.weatherwise.model.City city;
}
