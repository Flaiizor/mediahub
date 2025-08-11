package com.flaiizor.mediahub.backend.repository;

import com.flaiizor.mediahub.backend.model.ExperienceStatus;
import com.flaiizor.mediahub.backend.model.MediaItem;
import com.flaiizor.mediahub.backend.model.MediaType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
// JpaRepository alrady has save(), findById(), findAll(), and deleteById()
public interface MediaItemRepository extends JpaRepository<MediaItem, Long> {
    boolean existsByTitleIgnoreCase(String title);

    @Query("SELECT m FROM MediaItem m WHERE " +
            "(:title IS NULL OR :title = '' OR LOWER(m.title) LIKE LOWER(CONCAT('%', :title, '%'))) AND " +
            "(:type IS NULL OR m.type = :type) AND " +
            "(:genre IS NULL OR :genre = '' OR LOWER(m.genre) LIKE LOWER(CONCAT('%', :genre, '%'))) AND " +
            "(:creator IS NULL OR :creator = '' OR LOWER(m.creator) LIKE LOWER(CONCAT('%', :creator, '%'))) AND " +
            "(:rating IS NULL OR m.rating = :rating) AND " +
            "(:status IS NULL OR m.status = :status)")
    List<MediaItem> filterMediaItems(@Param("title") String title,
                                     @Param("type") MediaType type,
                                     @Param("genre") String genre,
                                     @Param("creator") String creator,
                                     @Param("rating") Integer rating,
                                     @Param("status") ExperienceStatus status);
}