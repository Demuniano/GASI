package com.area.api.dto;

public class ActRequestStateDTO {
    private Long actId;
    private String state;

    public ActRequestStateDTO(Long actId, String state) {
        this.actId = actId;
        this.state = state;
    }

    // Getters and setters
    public Long getActId() {
        return actId;
    }

    public void setActId(Long actId) {
        this.actId = actId;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
