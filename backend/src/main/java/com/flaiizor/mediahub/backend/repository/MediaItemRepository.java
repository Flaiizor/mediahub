package com.flaiizor.mediahub.backend.repository;

import com.flaiizor.mediahub.backend.model.ExperienceStatus;
import com.flaiizor.mediahub.backend.model.MediaItem;
import com.flaiizor.mediahub.backend.model.MediaType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
// JpaRepository alrady has save(), findById(), findAll(), and deleteById()
public interface MediaItemRepository extends JpaRepository<MediaItem, Long> {
    List<MediaItem> findByType(MediaType type);
    List<MediaItem> findByTitleContainingIgnoreCase(String keyword);
    boolean existsByTitleIgnoreCase(String title);
    List<MediaItem> findByStatus(ExperienceStatus status);
    List<MediaItem> findByTypeAndStatus(MediaType type, ExperienceStatus status);
    List<MediaItem> findByCreatorContainingIgnoreCase(String creator);
}
