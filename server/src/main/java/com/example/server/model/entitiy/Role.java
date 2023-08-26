package com.example.server.model.entitiy;

import org.babyfish.jimmer.sql.EnumItem;

public enum Role {
    @EnumItem(name = "admin")
    ADMIN,
    @EnumItem(name = "normal")
    NORMAL
}
