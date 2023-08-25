package com.example.server.controller;

import com.example.server.model.entitiy.Commodity;
import com.example.server.model.entitiy.CommodityFetcher;
import com.example.server.model.entitiy.CommodityTable;
import com.example.server.model.entitiy.input.CommodityInput;
import com.example.server.repository.CommodityRepository;
import lombok.AllArgsConstructor;
import org.babyfish.jimmer.client.FetchBy;
import org.babyfish.jimmer.sql.fetcher.Fetcher;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class CommodityController {

    private final CommodityRepository repository;

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

    @PutMapping("/commodities/")
    public void saveCommodity(@RequestBody CommodityInput commodityInput) {
        repository.save(commodityInput);
    }


    private static final Fetcher<Commodity> DEFAULT = CommodityFetcher.$.allScalarFields().image();
}
