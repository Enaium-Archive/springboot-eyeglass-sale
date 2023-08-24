package com.example.server.bll.error;

import org.babyfish.jimmer.error.ErrorFamily;

@ErrorFamily
public enum SessionError {
    USERNAME_NOT_FOUND,
    PASSWORD_NOT_MATCHED
}
