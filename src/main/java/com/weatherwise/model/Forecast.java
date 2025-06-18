package com.weatherwise.model;

import lombok.Data;
import java.util.List;

@Data
public class Forecast {
    private long dt;
    private com.weatherwise.model.Main main;
    private List<com.weatherwise.model.Weather> weather;
    private com.weatherwise.model.Clouds clouds;
    private com.weatherwise.model.Wind wind;
    private com.weatherwise.model.Rain rain;
    private com.weatherwise.model.Snow snow;
    private com.weatherwise.model.Sys sys;
}
