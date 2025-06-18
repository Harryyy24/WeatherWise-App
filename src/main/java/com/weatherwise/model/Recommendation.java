package com.weatherwise.model;

import lombok.Data;

@Data
public class Recommendation {
    private String clothing;
    private String activity;
    private String travelAdvice;
    
    public void setClothing(String clothing) {
        this.clothing = clothing;
    }
    
    public void setActivity(String activity) {
        this.activity = activity;
    }
    
    public void setTravelAdvice(String travelAdvice) {
        this.travelAdvice = travelAdvice;
    }
}
