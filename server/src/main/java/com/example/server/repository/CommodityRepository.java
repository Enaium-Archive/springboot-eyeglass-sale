package com.example.server.repository;

import org.babyfish.jimmer.spring.repository.JRepository;
import com.example.server.model.entitiy.Commodity;

public interface CommodityRepository extends JRepository<Commodity, Integer> {
}
