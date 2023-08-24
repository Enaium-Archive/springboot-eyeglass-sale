package com.example.server.model.entitiy;

import java.math.BigDecimal;

import com.example.server.model.entitiy.common.BaseEntity;
import org.babyfish.jimmer.sql.Entity;
import org.babyfish.jimmer.sql.GeneratedValue;
import org.babyfish.jimmer.sql.GenerationType;
import org.babyfish.jimmer.sql.Id;

@Entity
public interface Commodity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id();

    String name();

    int imageId();

    BigDecimal price();

    Integer minimumPrescription();

    Integer maximumPrescription();

    String description();
}

