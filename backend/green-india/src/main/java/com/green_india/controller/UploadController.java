package com.green_india.controller;

import com.green_india.entity.Photo;
import com.green_india.entity.Suggestion;
import com.green_india.repository.PhotoRepository;
import com.green_india.repository.SuggestionRepository;
import com.green_india.service.DetectionClient;
import com.green_india.service.OumiVerifierClient;
import com.green_india.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UploadController {

    @Autowired
    private StorageService storageService;

    @Autowired
    private DetectionClient detectionClient;

    @Autowired
    private SuggestionRepository suggestionRepo;

    @Autowired
    private PhotoRepository photoRepo;

    @Autowired
    private OumiVerifierClient oumiVerifierClient;

    @PostMapping("/upload")
    public ResponseEntity<?> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "userId", required = false) Integer userId
    ) {

        // 1️⃣ Save image
        String url = storageService.save(file);

        Photo photo = new Photo();
        photo.setUrl(url);
        photo.setFilename(file.getOriginalFilename());
        photoRepo.save(photo);

        // 2️⃣ YOLO detection
        Map detectionResp = detectionClient.detect(url);

        List<Map<String, Object>> detections =
                (List<Map<String, Object>>) detectionResp.get("detections");

        String finalLabel = "unknown_item";
        double confidence = 0.0;

        if (detections != null && !detections.isEmpty()) {

            // 3️⃣ Oumi Agent-1 (confusion resolver)
            Map<String, Object> verified =
                    oumiVerifierClient.verify(detections);

            if (verified != null && Boolean.TRUE.equals(verified.get("approved"))) {
                finalLabel = (String) verified.get("final_label");
                confidence = ((Number) verified.get("confidence")).doubleValue();
            } else {
                // fallback to top detection
                Map<String, Object> top = detections.get(0);
                finalLabel = (String) top.get("label");
                confidence = ((Number) top.get("confidence")).doubleValue();
            }
        }

        // 🔥 SINGLE SOURCE OF TRUTH
        List<Suggestion> suggestions = suggestionRepo.findByLabel(finalLabel);

        System.out.println("FINAL LABEL = " + finalLabel);
        System.out.println("CONFIDENCE = " + confidence);
        System.out.println("SUGGESTIONS FOUND = " + suggestions.size());

        return ResponseEntity.ok(Map.of(
                "photoId", photo.getId(),
                "finalLabel", finalLabel,
                "confidence", confidence,
                "detections", detections,
                "suggestions", suggestions
        ));
    }
}
