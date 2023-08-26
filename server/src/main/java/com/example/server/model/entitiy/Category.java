package com.example.server.model.entitiy;

import com.example.server.model.entitiy.common.BaseEntity;
import org.babyfish.jimmer.sql.*;

@Entity
public interface Category extends BaseEntity {
    String name();
}

