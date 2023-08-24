package com.example.server.model.entitiy;

import org.babyfish.jimmer.sql.EnumItem;

public enum Gender {
    @EnumItem(name = "female")
    FEMALE,
    @EnumItem(name = "male")
    MALE
}
