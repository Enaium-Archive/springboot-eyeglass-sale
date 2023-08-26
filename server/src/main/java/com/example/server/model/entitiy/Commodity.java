package com.example.server.model.entitiy;

import java.math.BigDecimal;

import com.example.server.model.entitiy.common.BaseEntity;
import org.babyfish.jimmer.sql.*;

@Entity
public interface Commodity extends BaseEntity {
    String name();

    @IdView
    int imageId();

    @ManyToOne
    Image image();

    BigDecimal price();

    int minimumPrescription();

    int maximumPrescription();

    int view();

    String description();

    @IdView
    int categoryId();

    @ManyToOne
    Category category();
}

