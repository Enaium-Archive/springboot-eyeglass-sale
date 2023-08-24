package com.example.server.bll.interceptor.input;

import com.example.server.model.entitiy.common.BaseEntityDraft;
import com.example.server.model.entitiy.common.BaseEntityProps;
import org.babyfish.jimmer.sql.DraftInterceptor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

import static org.babyfish.jimmer.ImmutableObjects.isLoaded;

@Component
public class BaseEntityDraftInterceptor implements DraftInterceptor<BaseEntityDraft> {
    @Override
    public void beforeSave(@NotNull BaseEntityDraft draft, boolean isNew) {
        if (!isLoaded(draft, BaseEntityProps.MODIFIED_TIME)) {
            draft.setModifiedTime(LocalDateTime.now());
        }
        if (isNew && !isLoaded(draft, BaseEntityProps.CREATED_TIME)) {
            draft.setCreatedTime(LocalDateTime.now());
        }
    }
}
