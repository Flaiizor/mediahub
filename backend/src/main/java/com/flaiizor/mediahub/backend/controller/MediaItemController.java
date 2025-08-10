package com.flaiizor.mediahub.backend.controller;

import com.flaiizor.mediahub.backend.dto.MediaItemRequest;
import com.flaiizor.mediahub.backend.dto.MediaItemResponse;
import com.flaiizor.mediahub.backend.mapper.MediaItemMapper;
import com.flaiizor.mediahub.backend.model.ExperienceStatus;
import com.flaiizor.mediahub.backend.model.MediaItem;
import com.flaiizor.mediahub.backend.model.MediaType;
import com.flaiizor.mediahub.backend.service.MediaItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/media-items")
public class MediaItemController {

    private final MediaItemService mediaItemService;
    private final MediaItemMapper mediaItemMapper;

    public MediaItemController(MediaItemService mediaItemService, MediaItemMapper mediaItemMapper) {
        this.mediaItemService = mediaItemService;
        this.mediaItemMapper = mediaItemMapper;
    }

    @PostMapping
    public ResponseEntity<MediaItemResponse> createMediaItem(@RequestBody MediaItemRequest request) {
        MediaItem createdItem = mediaItemService.createMediaItem(request);
        return ResponseEntity.ok(mediaItemMapper.toDto(createdItem));
    }

    @GetMapping
    public List<MediaItemResponse> getAllMediaItems() {
        return mediaItemService.getAllMediaItems().stream()
                .map(mediaItemMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MediaItemResponse> getMediaItemById(@PathVariable Long id) {
        return mediaItemService.getMediaItemById(id)
                .map(mediaItemMapper::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<MediaItemResponse> updateMediaItem(@PathVariable Long id, @RequestBody MediaItemRequest request) {
        return mediaItemService.updateMediaItem(id, request)
                .map(mediaItemMapper::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMediaItem(@PathVariable Long id) {
        boolean deleted = mediaItemService.deleteMediaItem(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/filter")
    public ResponseEntity<List<MediaItemResponse>> filterMediaItems(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String creator,
            @RequestParam(required = false) Integer rating,
            @RequestParam(required = false) String status) {

        try {
            MediaType mediaType = null;
            if (type != null && !type.trim().isEmpty()) {
                mediaType = MediaType.valueOf(type.toUpperCase());
            }

            ExperienceStatus experienceStatus = null;
            if (status != null && !status.trim().isEmpty()) {
                experienceStatus = ExperienceStatus.valueOf(status.toUpperCase());
            }

            List<MediaItemResponse> items = mediaItemService.filterMediaItems(
                            title, mediaType, genre, creator, rating, experienceStatus)
                    .stream()
                    .map(mediaItemMapper::toDto)
                    .toList();

            return ResponseEntity.ok(items);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /*
    @GetMapping("/type/{type}")
    public ResponseEntity<List<MediaItemResponse>> getByType(@PathVariable String type) {
        try {
            MediaType mediaType = MediaType.valueOf(type.toUpperCase());
            List<MediaItemResponse> items = mediaItemService.getMediaItemsByType(mediaType).stream()
                    .map(mediaItemMapper::toDto)
                    .toList();
            return ResponseEntity.ok(items);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<MediaItemResponse>> getByStatus(@PathVariable String status) {
        try {
            ExperienceStatus experienceStatus = ExperienceStatus.valueOf(status.toUpperCase());
            List<MediaItemResponse> items = mediaItemService.getMediaItemsByStatus(experienceStatus).stream()
                    .map(mediaItemMapper::toDto)
                    .toList();
            return ResponseEntity.ok(items);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/rating/{rating}")
    public List<MediaItemResponse> getByRating(@PathVariable int rating) {
        return mediaItemService.getMediaItemsByRating(rating).stream()
                .map(mediaItemMapper::toDto)
                .toList();
    }

    @GetMapping("/search")
    public List<MediaItemResponse> searchByTitle(@RequestParam String q) {
        return mediaItemService.searchMediaItemsByTitle(q).stream()
                .map(mediaItemMapper::toDto)
                .toList();
    }

    @GetMapping("/creator")
    public List<MediaItemResponse> searchByCreator(@RequestParam String name) {
        return mediaItemService.searchMediaItemsByCreator(name).stream()
                .map(mediaItemMapper::toDto)
                .toList();
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> existsByTitle(@RequestParam String title) {
        return ResponseEntity.ok(mediaItemService.existsByTitle(title));
    }

     */
}