package com.example.server.controller;

import com.example.server.model.entitiy.input.MemberInput;
import com.example.server.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class MemberController {

    private final MemberRepository memberRepository;

    @PutMapping("/members/")
    public void saveMember(@RequestBody MemberInput input) {
        memberRepository.save(input);
    }
}
