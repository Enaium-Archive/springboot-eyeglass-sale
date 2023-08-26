package com.example.server.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import com.example.server.model.entitiy.Category;
import com.example.server.model.entitiy.input.CategoryInput;
import com.example.server.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class CategoryController {
    private final CategoryRepository repository;

    @GetMapping("/categories/")
    public List<Category> getCategories() {
        return repository.findAll();
    }

    @SaCheckRole("ADMIN")
    @PostMapping("/categories/")
    public void saveCategory(@RequestBody CategoryInput category) {
        repository.insert(category);
    }

    @SaCheckRole("ADMIN")
    @DeleteMapping("/categories/{id}/")
    public void removeCategory(@PathVariable int id) {
        repository.deleteById(id);
    }
}
