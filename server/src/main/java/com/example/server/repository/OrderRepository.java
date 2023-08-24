package com.example.server.repository;

import org.babyfish.jimmer.spring.repository.JRepository;
import com.example.server.model.entitiy.Order;

public interface OrderRepository extends JRepository<Order, Integer> {
}
