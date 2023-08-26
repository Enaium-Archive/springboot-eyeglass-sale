package com.example.server.model.entitiy;

import com.example.server.model.entitiy.common.BaseEntity;
import org.babyfish.jimmer.sql.*;

@Entity
public interface Image extends BaseEntity {
    @Column(name = "hash32")
    String hash32();
}

