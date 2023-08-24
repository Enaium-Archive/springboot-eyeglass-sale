package com.example.server.model.response;

import lombok.Data;

@Data
public class Session {
    private final int id;
    private final String token;
}
