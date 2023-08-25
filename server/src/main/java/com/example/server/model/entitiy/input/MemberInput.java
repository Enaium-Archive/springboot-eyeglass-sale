package com.example.server.model.entitiy.input;

import java.util.Date;

import com.example.server.model.entitiy.Gender;
import org.jetbrains.annotations.Nullable;
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

    @Nullable
    private String username;

    @Nullable
    private String password;

    private String phone;

    @Nullable
    private Gender gender;

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
