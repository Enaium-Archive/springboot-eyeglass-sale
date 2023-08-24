package com.example.server.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.example.server.bll.error.SessionError;
import com.example.server.bll.error.SessionException;
import com.example.server.model.entitiy.Member;
import com.example.server.model.entitiy.input.MemberInput;
import com.example.server.model.response.Session;
import com.example.server.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.babyfish.jimmer.client.ThrowsAll;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class SessionController {

    private final MemberRepository memberRepository;

    @PostMapping("/sessions/")
    @ThrowsAll(SessionError.class)
    public Session login(@RequestBody MemberInput memberInput) {
        final Member byUsername = memberRepository.findByUsername(memberInput.getUsername());
        if (byUsername == null) {
            throw SessionException.usernameNotFound("用户名不存在");
        }

        if (!byUsername.password().equals(memberInput.getPassword())) {
            throw SessionException.passwordNotMatched("密码不匹配");
        }

        return new Session(byUsername.id(), StpUtil.createLoginSession(byUsername.id()));
    }
}