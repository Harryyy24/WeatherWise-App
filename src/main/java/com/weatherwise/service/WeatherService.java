package com.weatherwise.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.http.HttpStatus;
import com.weatherwise.model.WeatherData;
import com.weatherwise.model.WeatherForecast;
import com.weatherwise.model.Recommendation;

@Service
public class WeatherService {
    @Value("${openweathermap.api.key}")
    private String apiKey;

    private final String BASE_URL = "https://api.openweathermap.org/data/2.5/";
    private final RestTemplate restTemplate = new RestTemplate();

    public WeatherData getCurrentWeather(String city) {
        if (city == null || city.trim().isEmpty()) {
            throw new IllegalArgumentException("City name cannot be empty");
        }
        
        String url = String.format("%sweather?q=%s&appid=%s&units=metric", BASE_URL, city, apiKey);
        try {
            WeatherData weatherData = restTemplate.getForObject(url, WeatherData.class);
            if (weatherData == null) {
                throw new RuntimeException("Failed to fetch weather data for " + city);
            }
            return weatherData;
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new RuntimeException("City not found: " + city);
            }
            throw new RuntimeException("Failed to fetch weather data for " + city, e);
        }
    }

    public WeatherForecast getWeatherForecast(String city) {
        if (city == null || city.trim().isEmpty()) {
            throw new IllegalArgumentException("City name cannot be empty");
        }
        
        String url = String.format("%sforecast?q=%s&appid=%s&units=metric", BASE_URL, city, apiKey);
        try {
            WeatherForecast forecast = restTemplate.getForObject(url, WeatherForecast.class);
            if (forecast == null) {
                throw new RuntimeException("Failed to fetch weather forecast for " + city);
            }
            return forecast;
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new RuntimeException("City not found: " + city);
            }
            throw new RuntimeException("Failed to fetch weather forecast for " + city, e);
        }
    }

    public Recommendation getRecommendations(WeatherData weatherData) {
        if (weatherData == null) {
            throw new IllegalArgumentException("Weather data cannot be null");
        }
        
        Recommendation recommendation = new Recommendation();
        
        // Temperature-based clothing recommendations
        double temp = weatherData.getMain().getTemp();
        if (temp < 10) {
            recommendation.setClothing("Wear warm clothing and a winter jacket");
        } else if (temp < 20) {
            recommendation.setClothing("Wear a light jacket and long sleeves");
        } else {
            recommendation.setClothing("Wear light clothing and sunglasses");
        }

        // Weather condition-based activity recommendations
        String description = weatherData.getWeather().get(0).getDescription().toLowerCase();
        if (description.contains("rain") || description.contains("thunderstorm")) {
            recommendation.setActivity("Carry an umbrella and avoid outdoor activities");
        } else if (description.contains("clear") || description.contains("sunny")) {
            recommendation.setActivity("Perfect weather for outdoor activities");
        } else if (description.contains("cloudy")) {
            recommendation.setActivity("Good day for indoor activities");
        }

        // Travel advice based on weather conditions
        if (temp < 0 || description.contains("severe")) {
            recommendation.setTravelAdvice("Travel conditions may be hazardous. Exercise caution.");
        } else if (temp > 35) {
            recommendation.setTravelAdvice("Expect hot weather. Stay hydrated and avoid midday travel.");
        } else {
            recommendation.setTravelAdvice("Good travel conditions. Enjoy your journey!");
        }

        return recommendation;
    }
}
