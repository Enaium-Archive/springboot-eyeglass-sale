package com.example.server.model.entitiy.common;

import org.babyfish.jimmer.sql.MappedSuperclass;

import java.time.LocalDateTime;

@MappedSuperclass
public interface BaseEntity {
    LocalDateTime createdTime();

    LocalDateTime modifiedTime();
}
