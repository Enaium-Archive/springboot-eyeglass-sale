package com.example.server.model.entitiy.input;

import com.example.server.model.entitiy.Category;
import com.example.server.model.entitiy.Image;
import lombok.Data;
import org.babyfish.jimmer.Input;
import org.jetbrains.annotations.Nullable;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Data
public class CategoryInput implements Input<Category> {
    private Integer id;

    @Nullable
    private String name;

    private static final Converter CONVERTER = Mappers.getMapper(Converter.class);

    @Override
    public Category toEntity() {
        return CONVERTER.toCategory(this);
    }

    @Mapper
    interface Converter {
        @BeanMapping(
                unmappedTargetPolicy = ReportingPolicy.IGNORE,
                nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS
        )
        Category toCategory(CategoryInput input);
    }
}
