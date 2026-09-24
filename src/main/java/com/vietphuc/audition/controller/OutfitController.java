package com.vietphuc.audition.controller;

import com.vietphuc.audition.dto.OutfitRequest;
import com.vietphuc.audition.dto.OutfitResponse;
import com.vietphuc.audition.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class OutfitController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/check-outfit")
    public OutfitResponse checkOutfit(@RequestBody OutfitRequest request) {
        if (request.getItemIds() == null || request.getItemIds().isEmpty()) {
            return new OutfitResponse("error", "Vui lòng chọn ít nhất 1 món đồ!");
        }

        String feedback = geminiService.checkOutfit(request.getItemIds(), request.getEvent());
        return new OutfitResponse("success", feedback);
    }
}