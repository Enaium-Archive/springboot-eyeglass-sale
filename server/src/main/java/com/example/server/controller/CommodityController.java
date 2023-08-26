package com.example.server.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaIgnore;
import com.example.server.bll.error.CommodityError;
import com.example.server.bll.error.CommodityException;
import com.example.server.model.entitiy.CategoryFetcher;
import com.example.server.model.entitiy.Commodity;
import com.example.server.model.entitiy.CommodityFetcher;
import com.example.server.model.entitiy.CommodityTable;
import com.example.server.model.entitiy.input.CommodityInput;
import com.example.server.repository.CommodityRepository;
import lombok.AllArgsConstructor;
import org.babyfish.jimmer.client.FetchBy;
import org.babyfish.jimmer.client.ThrowsAll;
import org.babyfish.jimmer.sql.fetcher.Fetcher;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@AllArgsConstructor
public class CommodityController {

    private final CommodityRepository repository;

    @SaIgnore
    @GetMapping("/commodities/")
    public Page<@FetchBy("DEFAULT") Commodity> getCommodities(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Integer minimumPrescription,
            @RequestParam(required = false) Integer maximumPrescription
    ) {
        return repository.pager(page, size).execute(repository.sql()
                .createQuery(CommodityTable.$)
                .whereIf(minimumPrescription != null, () -> CommodityTable.$.minimumPrescription().ge(minimumPrescription))
                .whereIf(maximumPrescription != null, () -> CommodityTable.$.maximumPrescription().le(maximumPrescription))
                .select(CommodityTable.$.fetch(DEFAULT)));
    }

    @SaIgnore
    @ThrowsAll(CommodityError.class)
    @GetMapping("/commodities/{id}/")
    public @FetchBy("DEFAULT") Commodity getCommodity(@PathVariable int id) {
        final Optional<Commodity> byId = repository.findById(id, DEFAULT);
        if (byId.isEmpty()) {
            throw CommodityException.commodityNotFound("商品不存在");
        }

        repository.sql().createUpdate(CommodityTable.$)
                .where(CommodityTable.$.id().eq(id))
                .set(CommodityTable.$.view(), CommodityTable.$.view().plus(1))
                .execute();

        return byId.get();
    }

    @SaCheckRole("ADMIN")
    @PutMapping("/commodities/")
    public void saveCommodity(@RequestBody CommodityInput commodityInput) {
        repository.save(commodityInput);
    }

    @SaCheckRole("ADMIN")
    @DeleteMapping("/commodities/{id}/")
    public void removeCommodity(@PathVariable int id) {
        repository.deleteById(id);
    }

    private static final Fetcher<Commodity> DEFAULT = CommodityFetcher.$.allScalarFields().image().category(CategoryFetcher.$.name());
}
