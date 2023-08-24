package com.example.server.model.entitiy;

import com.example.server.model.entitiy.common.BaseEntity;
import jakarta.annotation.Nullable;
import org.babyfish.jimmer.sql.Entity;
import org.babyfish.jimmer.sql.GeneratedValue;
import org.babyfish.jimmer.sql.GenerationType;
import org.babyfish.jimmer.sql.Id;

@Entity
public interface Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id();

    String name();

    String password();

    @Nullable
    Integer phone();

    @Nullable
    Object gender();
}

