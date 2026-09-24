package com.vietphuc.audition.dto;

import java.util.List;

public class OutfitRequest {
    private List<String> itemIds;
    private String event;

    public OutfitRequest() {}

    public List<String> getItemIds() { return itemIds; }
    public void setItemIds(List<String> itemIds) { this.itemIds = itemIds; }

    public String getEvent() { return event; }
    public void setEvent(String event) { this.event = event; }
}