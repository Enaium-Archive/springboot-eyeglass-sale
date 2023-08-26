package com.example.server.controller;

import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.exception.NotRoleException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionController {
    @ExceptionHandler(NotLoginException.class)
    public ResponseEntity<Object> handlerNotLoginException(NotLoginException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @ExceptionHandler(NotRoleException.class)
    public ResponseEntity<Object> handlerNotRoleException(NotRoleException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}