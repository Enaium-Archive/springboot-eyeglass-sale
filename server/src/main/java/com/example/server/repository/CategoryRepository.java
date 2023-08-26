package com.example.server.repository;

import com.example.server.model.entitiy.Category;
import com.example.server.model.entitiy.Commodity;
import org.babyfish.jimmer.spring.repository.JRepository;

public interface CategoryRepository extends JRepository<Category, Integer> {
}
