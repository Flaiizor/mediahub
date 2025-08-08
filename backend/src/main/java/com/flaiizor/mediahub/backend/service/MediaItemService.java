package com.flaiizor.mediahub.backend.service;

import com.flaiizor.mediahub.backend.dto.MediaItemRequest;
import com.flaiizor.mediahub.backend.mapper.MediaItemMapper;
import com.flaiizor.mediahub.backend.model.ExperienceStatus;
import com.flaiizor.mediahub.backend.model.MediaItem;
import com.flaiizor.mediahub.backend.model.MediaType;
import com.flaiizor.mediahub.backend.repository.MediaItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MediaItemService {

    private final MediaItemRepository mediaItemRepository;
    private final MediaItemMapper mediaItemMapper;

    public MediaItemService(MediaItemRepository mediaItemRepository, MediaItemMapper mediaItemMapper) {
        this.mediaItemRepository = mediaItemRepository;
        this.mediaItemMapper = mediaItemMapper;
    }

    public MediaItem createMediaItem(MediaItemRequest request) {
        if (mediaItemRepository.existsByTitleIgnoreCase(request.getTitle())) {
            throw new IllegalArgumentException("A media item with this title already exists.");
        }
        MediaItem item = mediaItemMapper.toEntity(request);
        return mediaItemRepository.save(item);
    }

    public List<MediaItem> getAllMediaItems() {
        return mediaItemRepository.findAll();
    }

    public Optional<MediaItem> getMediaItemById(Long id) {
        return mediaItemRepository.findById(id);
    }

    public boolean existsByTitle(String title) {
        return mediaItemRepository.existsByTitleIgnoreCase(title);
    }

    public Optional<MediaItem> updateMediaItem(Long id, MediaItemRequest request) {
        return mediaItemRepository.findById(id).map(existingItem -> {
            mediaItemMapper.updateEntity(existingItem, request);
            return mediaItemRepository.save(existingItem);
        });
    }

    public boolean deleteMediaItem(Long id) {
        if (mediaItemRepository.existsById(id)) {
            mediaItemRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<MediaItem> getMediaItemsByType(MediaType type) {
        return mediaItemRepository.findByType(type);
    }

    public List<MediaItem> getMediaItemsByStatus(ExperienceStatus status) {
        return mediaItemRepository.findByStatus(status);
    }

    public List<MediaItem> getMediaItemsByTypeAndStatus(MediaType type, ExperienceStatus status) {
        return mediaItemRepository.findByTypeAndStatus(type, status);
    }

    public List<MediaItem> searchMediaItemsByTitle(String keyword) {
        return mediaItemRepository.findByTitleContainingIgnoreCase(keyword);
    }

    public List<MediaItem> searchMediaItemsByCreator(String creator) {
        return mediaItemRepository.findByCreatorContainingIgnoreCase(creator);
    }
}
