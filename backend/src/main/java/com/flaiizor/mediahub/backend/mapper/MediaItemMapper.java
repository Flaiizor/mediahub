package com.flaiizor.mediahub.backend.mapper;

import com.flaiizor.mediahub.backend.dto.MediaItemRequest;
import com.flaiizor.mediahub.backend.dto.MediaItemResponse;
import com.flaiizor.mediahub.backend.model.MediaItem;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface MediaItemMapper {

    @Mapping(target = "id", ignore = true)
    MediaItem toEntity(MediaItemRequest request);

    MediaItemResponse toDto(MediaItem item);

    @Mapping(target = "id", ignore = true)
    void updateEntity(@MappingTarget MediaItem entity, MediaItemRequest request);
}
