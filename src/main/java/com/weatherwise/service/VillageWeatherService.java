package com.weatherwise.service;

import com.weatherwise.model.VillageWeather;
import com.weatherwise.model.WeatherAlert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class VillageWeatherService {
    private static final Map<String, VillageWeather> villageWeatherMap = new HashMap<>();
    private static final Map<String, WeatherAlert> alertMap = new HashMap<>();

    @Autowired
    private JavaMailSender mailSender;

    public VillageWeather getVillageWeather(String villageName) {
        // Get village weather data from your data source
        // This is a placeholder - you'll need to implement actual data fetching
        VillageWeather weather = villageWeatherMap.get(villageName);
        if (weather == null) {
            weather = new VillageWeather();
            // Set default values
            weather.setVillageName(villageName);
            weather.setDistrict("Unknown");
            weather.setState("Unknown");
            weather.setTemperature(25.0);
            weather.setHumidity(60.0);
            weather.setPressure(1013);
            weather.setWindSpeed(5.0);
            weather.setWeatherCondition("Clear");
            weather.setTimestamp(LocalDateTime.now());
            villageWeatherMap.put(villageName, weather);
        }
        return weather;
    }

    public void createWeatherAlert(String villageName, WeatherAlert alert) {
        alertMap.put(villageName, alert);
        sendAlertEmail(villageName, alert);
    }

    private void sendAlertEmail(String villageName, WeatherAlert alert) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(alert.getEmail());
        message.setSubject("Weather Alert for " + villageName);
        message.setText(String.format("Dear User,\n\nA weather alert has been issued for %s:\n\nType: %s\nSeverity: %s\nDescription: %s\nStart Time: %s\nEnd Time: %s\n\nPlease take necessary precautions.\n\nWeatherWise Team",
            villageName,
            alert.getAlertType(),
            alert.getSeverity(),
            alert.getDescription(),
            alert.getStartTime(),
            alert.getEndTime()));
        
        mailSender.send(message);
    }

    public boolean checkForAlerts(String villageName) {
        WeatherAlert alert = alertMap.get(villageName);
        if (alert != null && alert.isActive()) {
            LocalDateTime now = LocalDateTime.now();
            return now.isAfter(alert.getStartTime()) && now.isBefore(alert.getEndTime());
        }
        return false;
    }
}
