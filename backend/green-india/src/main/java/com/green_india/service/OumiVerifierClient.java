package com.green_india.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class OumiVerifierClient {

    private final WebClient webClient;

    public OumiVerifierClient(
            @Value("${oumi.agent1.url}") String baseUrl
    ) {
        this.webClient = WebClient.create(baseUrl);
    }

    /**
     * Sends TOP detections to Oumi for confusion resolution
     */
    public Map<String, Object> verify(List<Map<String, Object>> detections) {
        try {
            return webClient.post()
                    .uri("/verify")
                    .bodyValue(Map.of(
                            "detections", detections
                    ))
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();
        } catch (Exception e) {
            return Map.of(
                    "approved", false,
                    "final_label", "unknown_item",
                    "confidence", 0.0,
                    "reason", "oumi_service_error"
            );
        }
    }
}
