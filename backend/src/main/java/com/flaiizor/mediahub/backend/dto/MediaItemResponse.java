package com.flaiizor.mediahub.backend.dto;

import com.flaiizor.mediahub.backend.model.ExperienceStatus;
import com.flaiizor.mediahub.backend.model.MediaType;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MediaItemResponse {
    private Long id;
    private String title;
    private MediaType type;
    private String genre;
    private Integer releaseYear;
    private String creator;
    private ExperienceStatus status;
    private String review;
}
