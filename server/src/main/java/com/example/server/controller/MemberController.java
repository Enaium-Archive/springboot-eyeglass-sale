package com.example.server.controller;

import com.example.server.model.entitiy.Member;
import com.example.server.model.entitiy.MemberFetcher;
import com.example.server.model.entitiy.input.MemberInput;
import com.example.server.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.babyfish.jimmer.client.FetchBy;
import org.babyfish.jimmer.sql.fetcher.Fetcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class MemberController {

    private final MemberRepository repository;

    @GetMapping("/members/")
    public Page<@FetchBy("DEFAULT") Member> getMembers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return repository.findAll(PageRequest.of(page, size), DEFAULT);
    }

    @GetMapping("/members/{id}/")
    public @FetchBy("DEFAULT") Member getMember(@PathVariable int id) {
        return repository.findById(id, DEFAULT).orElseThrow();
    }

    @PutMapping("/members/")
    public void saveMember(@RequestBody MemberInput input) {
        repository.save(input);
    }

    private static final Fetcher<Member> DEFAULT = MemberFetcher.$.allScalarFields().password(false);
}
