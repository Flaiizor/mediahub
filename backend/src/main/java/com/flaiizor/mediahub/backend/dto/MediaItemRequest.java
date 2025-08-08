package com.flaiizor.mediahub.backend.dto;

import com.flaiizor.mediahub.backend.model.ExperienceStatus;
import com.flaiizor.mediahub.backend.model.MediaType;
import jakarta.validation.constraints.*;

import lombok.Data;

@Data
public class MediaItemRequest {

    @NotBlank(message = "Title must not be blank")
    private String title;

    @NotBlank(message = "Type must not be blank")
    private MediaType type;

    @NotBlank(message = "Genre must not be blank")
    private String genre;

    @NotNull(message = "Release year is required")
    @Min(value = 1800, message = "Release year must be after 1800")
    @Max(value = 2100, message = "Release year must be before 2100")
    private Integer releaseYear;

    @Size(max = 100, message = "Creator name is too long")
    private String creator;

    private ExperienceStatus status;

    @Size(max = 2000, message = "Review is too long")
    private String review;
}
