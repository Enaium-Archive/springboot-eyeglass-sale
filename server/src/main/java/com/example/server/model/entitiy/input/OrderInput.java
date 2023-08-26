package com.example.server.model.entitiy.input;

import java.util.Date;

import com.example.server.model.entitiy.Order;
import lombok.Data;
import org.babyfish.jimmer.Input;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.mapstruct.NullValueCheckStrategy;

@Data
public class OrderInput implements Input<Order> {
    private Integer id;

    private Integer memberId;

    private CommodityInput commodity;

    private Integer quantity;

    private Integer prescription;

    private static final Converter CONVERTER = Mappers.getMapper(Converter.class);

    @Override
    public Order toEntity() {
        return CONVERTER.toOrder(this);
    }

    @Mapper
    interface Converter {
        @BeanMapping(
                unmappedTargetPolicy = ReportingPolicy.IGNORE,
                nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS
        )
        Order toOrder(OrderInput input);
    }
}
