package com.example.server.model.entitiy;

import com.example.server.model.entitiy.common.BaseEntity;
import org.babyfish.jimmer.sql.*;
import org.jetbrains.annotations.Nullable;

@Entity
public interface Member extends BaseEntity {
    @Key
    String username();

    String password();

    @Nullable
    String phone();

    @Nullable
    Gender gender();

    Role role();
}

