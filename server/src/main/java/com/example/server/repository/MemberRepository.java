package com.example.server.repository;

import org.jetbrains.annotations.Nullable;
import org.babyfish.jimmer.spring.repository.JRepository;
import com.example.server.model.entitiy.Member;

public interface MemberRepository extends JRepository<Member, Integer> {
    @Nullable
    Member findByUsername(String username);
}
