package com.weatherwise.model;

import java.time.LocalDateTime;

public class VillageWeather {
    private String villageName;
    private String district;
    private String state;
    private double temperature;
    private double humidity;
    private int pressure;
    private double windSpeed;
    private String weatherCondition;
    private LocalDateTime timestamp;
    private WeatherAlert alert;

    // Getters and Setters
    public String getVillageName() { return villageName; }
    public void setVillageName(String villageName) { this.villageName = villageName; }
    
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    
    public double getTemperature() { return temperature; }
    public void setTemperature(double temperature) { this.temperature = temperature; }
    
    public double getHumidity() { return humidity; }
    public void setHumidity(double humidity) { this.humidity = humidity; }
    
    public int getPressure() { return pressure; }
    public void setPressure(int pressure) { this.pressure = pressure; }
    
    public double getWindSpeed() { return windSpeed; }
    public void setWindSpeed(double windSpeed) { this.windSpeed = windSpeed; }
    
    public String getWeatherCondition() { return weatherCondition; }
    public void setWeatherCondition(String weatherCondition) { this.weatherCondition = weatherCondition; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    
    public WeatherAlert getAlert() { return alert; }
    public void setAlert(WeatherAlert alert) { this.alert = alert; }
}
