package com.example.server.model.entitiy.input;

import java.util.Date;

import lombok.Data;
import org.babyfish.jimmer.Input;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.mapstruct.NullValueCheckStrategy;
import com.example.server.model.entitiy.Member;

@Data
public class MemberInput implements Input<Member> {
    private Integer id;

    private String name;

    private String password;

    private Integer phone;

    private Object gender;

    private Date createdTime;

    private Date modifiedTime;


    private static final Converter CONVERTER = Mappers.getMapper(Converter.class);

    @Override
    public Member toEntity() {
        return CONVERTER.toMember(this);
    }

    @Mapper
    interface Converter {
        @BeanMapping(
                unmappedTargetPolicy = ReportingPolicy.IGNORE,
                nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS
        )
        Member toMember(MemberInput input);
    }
}
