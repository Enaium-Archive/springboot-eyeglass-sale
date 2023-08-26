package com.example.server.model.entitiy;

import com.example.server.model.entitiy.common.BaseEntity;
import org.babyfish.jimmer.sql.*;

@Entity
public interface Order extends BaseEntity {
    @IdView
    int memberId();

    @ManyToOne
    Member member();

    @IdView
    int commodityId();

    @ManyToOne
    Commodity commodity();

    Integer quantity();

    Integer prescription();
}

