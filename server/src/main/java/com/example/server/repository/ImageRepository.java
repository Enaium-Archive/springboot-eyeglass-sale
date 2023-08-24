package com.example.server.repository;

import org.babyfish.jimmer.spring.repository.JRepository;
import com.example.server.model.entitiy.Image;

public interface ImageRepository extends JRepository<Image, Integer> {
}
