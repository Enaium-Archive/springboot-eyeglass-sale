package com.example.server.model.entitiy.input;

import java.util.Date;

import lombok.Data;
import org.babyfish.jimmer.Input;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.mapstruct.NullValueCheckStrategy;
import com.example.server.model.entitiy.Image;

@Data
public class ImageInput implements Input<Image> {
    private Integer id;

    private String hash32;

    private Date createdTime;

    private Date modifiedTime;

    private static final Converter CONVERTER = Mappers.getMapper(Converter.class);

    @Override
    public Image toEntity() {
        return CONVERTER.toImage(this);
    }

    @Mapper
    interface Converter {
        @BeanMapping(
                unmappedTargetPolicy = ReportingPolicy.IGNORE,
                nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS
        )
        Image toImage(ImageInput input);
    }
}
