package com.example.server.repository;

import org.babyfish.jimmer.spring.repository.JRepository;
import com.example.server.model.entitiy.Order;
import org.babyfish.jimmer.sql.fetcher.Fetcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderRepository extends JRepository<Order, Integer> {
    Page<Order> findAllByMemberId(Pageable pageable, Fetcher<Order> fetcher, Integer memberId);
}
