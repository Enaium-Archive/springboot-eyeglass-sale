package com.example.server.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.stp.StpUtil;
import com.example.server.model.entitiy.*;
import com.example.server.model.entitiy.input.OrderInput;
import com.example.server.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.babyfish.jimmer.client.FetchBy;
import org.babyfish.jimmer.sql.fetcher.Fetcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@RestController
@AllArgsConstructor
public class OrderController {

    private final OrderRepository repository;

    @GetMapping("/orders/")
    public Page<@FetchBy("DEFAULT") Order> getOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Integer member
    ) {
        boolean admin = StpUtil.getRoleList().contains(Role.ADMIN.name());

        if (member == null) {
            if (admin) {
                return repository.findAll(PageRequest.of(page, size), DEFAULT);
            } else {
                return repository.findAllByMemberId(PageRequest.of(page, size), DEFAULT, StpUtil.getLoginIdAsInt());
            }
        } else {
            if (admin) {
                return repository.findAllByMemberId(PageRequest.of(page, size), DEFAULT, member);
            } else {
                return repository.findAllByMemberId(PageRequest.of(page, size), DEFAULT, StpUtil.getLoginIdAsInt());
            }
        }
    }

    @SaCheckRole("ADMIN")
    @GetMapping("/orders/monthly-count/")
    public long getMonthlyCount() {
        return repository.sql().createQuery(OrderTable.$)
                .where(OrderTable.$.createdTime().between(LocalDateTime.now().minusMonths(1), LocalDateTime.now()))
                .select(OrderTable.$.id()).count();
    }

    @SaCheckRole("ADMIN")
    @GetMapping("/orders/quarterly-count/")
    public long getQuarterlyCount() {
        return repository.sql().createQuery(OrderTable.$)
                .where(OrderTable.$.createdTime().between(LocalDateTime.now().minusMonths(3), LocalDateTime.now()))
                .select(OrderTable.$.id()).count();
    }

    @PostMapping("/orders/")
    public void createOrder(@RequestBody OrderInput orderInput) {
        orderInput.setMemberId(StpUtil.getLoginIdAsInt());
        repository.insert(orderInput);
    }

    @SaCheckRole("ADMIN")
    @DeleteMapping("/orders/{id}/")
    public void removeOrder(@PathVariable int id) {
        repository.deleteById(id);
    }

    private static final Fetcher<Order> DEFAULT = OrderFetcher.$.allScalarFields().commodity(CommodityFetcher.$.name().price());
}
