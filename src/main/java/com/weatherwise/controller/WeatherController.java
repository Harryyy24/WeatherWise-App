package com.weatherwise.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.weatherwise.service.WeatherService;
import com.weatherwise.service.VillageWeatherService;
import com.weatherwise.model.WeatherData;
import com.weatherwise.model.WeatherForecast;
import com.weatherwise.model.Recommendation;
import com.weatherwise.model.VillageWeather;
import com.weatherwise.model.WeatherAlert;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {
    @Autowired
    private WeatherService weatherService;
    
    @Autowired
    private VillageWeatherService villageWeatherService;

    @GetMapping("/current")
    public WeatherData getCurrentWeather(@RequestParam String city) {
        return weatherService.getCurrentWeather(city);
    }

    @GetMapping("/forecast")
    public WeatherForecast getWeatherForecast(@RequestParam String city) {
        return weatherService.getWeatherForecast(city);
    }

    @GetMapping("/recommendations")
    public ResponseEntity<Recommendation> getRecommendations(@RequestParam String city) {
        try {
            WeatherData weatherData = weatherService.getCurrentWeather(city);
            Recommendation recommendation = weatherService.getRecommendations(weatherData);
            return ResponseEntity.ok(recommendation);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/auto")
    public WeatherData getCurrentWeatherAuto() {
        // TODO: Implement location detection using IP or Geolocation API
        return weatherService.getCurrentWeather("Delhi"); // Default to Delhi
    }

    @GetMapping("/village")
    public VillageWeather getVillageWeather(@RequestParam String villageName) {
        return villageWeatherService.getVillageWeather(villageName);
    }

    @PostMapping("/alert")
    public ResponseEntity<Void> createWeatherAlert(@RequestBody WeatherAlert alert, @RequestParam String villageName) {
        villageWeatherService.createWeatherAlert(villageName, alert);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/check-alert")
    public boolean checkForAlerts(@RequestParam String villageName) {
        return villageWeatherService.checkForAlerts(villageName);
    }
}
