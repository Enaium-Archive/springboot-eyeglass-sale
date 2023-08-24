package com.example.server.model.entitiy;

import com.example.server.model.entitiy.common.BaseEntity;
import org.babyfish.jimmer.sql.*;

@Entity
public interface Order extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id();

    @ManyToOne
    Member member();

    @ManyToOne
    Commodity commodity();

    Integer quantity();
}

