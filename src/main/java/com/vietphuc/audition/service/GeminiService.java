package com.vietphuc.audition.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    public String checkOutfit(List<String> items, String event) {
        if (apiKey == null || apiKey.contains("YOUR_GEMINI_API_KEY")) {
            return "Chưa cấu hình Gemini API Key trong application.properties!";
        }

        try {
            RestTemplate restTemplate = new RestTemplate();
            String fullUrl = apiUrl + "?key=" + apiKey;

            String promptText = String.format(
                "Bạn là AI Gatekeeper kiểm duyệt văn hóa Việt phục cho Audition Remix. " +
                "Người dùng phối: %s cho sự kiện: '%s'. " +
                "Hãy nhận xét ngắn gọn (dưới 100 từ), xì-tin Gen Z, chấm điểm thang 10 và kết luận có duyệt cho POST bài không.",
                items.toString(), event
            );

            Map<String, Object> textPart = Map.of("text", promptText);
            Map<String, Object> partsContent = Map.of("parts", List.of(textPart));
            Map<String, Object> requestBody = Map.of("contents", List.of(partsContent));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(fullUrl, entity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                List candidates = (List) response.getBody().get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map candidate = (Map) candidates.get(0);
                    Map content = (Map) candidate.get("content");
                    List parts = (List) content.get("parts");
                    Map firstPart = (Map) parts.get(0);
                    return (String) firstPart.get("text");
                }
            }
            return "Không nhận được phản hồi từ Gemini AI.";
        } catch (Exception e) {
            return "Lỗi khi gọi Gemini API: " + e.getMessage();
        }
    }
}