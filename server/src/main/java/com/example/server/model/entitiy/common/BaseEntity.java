package com.example.server.model.entitiy.common;

import org.babyfish.jimmer.sql.GeneratedValue;
import org.babyfish.jimmer.sql.GenerationType;
import org.babyfish.jimmer.sql.Id;
import org.babyfish.jimmer.sql.MappedSuperclass;

import java.time.LocalDateTime;

@MappedSuperclass
public interface BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id();

    LocalDateTime createdTime();

    LocalDateTime modifiedTime();
}
