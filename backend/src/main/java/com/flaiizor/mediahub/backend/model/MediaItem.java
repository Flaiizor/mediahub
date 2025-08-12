package com.flaiizor.mediahub.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MediaItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Enumerated(EnumType.STRING)
    private MediaType type;

    private String genre;

    private Integer releaseYear;

    private String creator;

    @Enumerated(EnumType.STRING)
    private ExperienceStatus status;

    private int rating;

    @Column(length = 2000)
    private String review;
}
