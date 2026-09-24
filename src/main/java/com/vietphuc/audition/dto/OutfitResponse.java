package com.vietphuc.audition.dto;

public class OutfitResponse {
    private String status;
    private String feedback;

    public OutfitResponse(String status, String feedback) {
        this.status = status;
        this.feedback = feedback;
    }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
}