package com.example.server.model.entitiy.input;

import java.math.BigDecimal;
import java.util.Date;

import org.jetbrains.annotations.Nullable;
import lombok.Data;
import org.babyfish.jimmer.Input;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.mapstruct.NullValueCheckStrategy;
import com.example.server.model.entitiy.Commodity;

@Data
public class CommodityInput implements Input<Commodity> {
    private Integer id;

    @Nullable
    private String name;

    private ImageInput image;

    @Nullable
    private BigDecimal price;

    private Integer minimumPrescription;

    private Integer maximumPrescription;

    @Nullable
    private String description;

    private CategoryInput category;

    private static final Converter CONVERTER = Mappers.getMapper(Converter.class);

    @Override
    public Commodity toEntity() {
        return CONVERTER.toCommodity(this);
    }

    @Mapper
    interface Converter {
        @BeanMapping(
                unmappedTargetPolicy = ReportingPolicy.IGNORE,
                nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS
        )
        Commodity toCommodity(CommodityInput input);
    }
}
