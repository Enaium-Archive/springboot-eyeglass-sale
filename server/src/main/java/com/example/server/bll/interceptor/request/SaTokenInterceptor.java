package com.example.server.bll.interceptor.request;

import cn.dev33.satoken.interceptor.SaInterceptor;
import cn.dev33.satoken.router.SaRouter;
import cn.dev33.satoken.stp.StpInterface;
import cn.dev33.satoken.stp.StpUtil;
import com.example.server.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class SaTokenInterceptor extends SaInterceptor implements StpInterface {

    private final MemberRepository memberRepository;

    public SaTokenInterceptor(MemberRepository memberRepository, @Value("${jimmer.client.ts.path}") String typescriptPath) {
        super(auth -> {
            SaRouter.match("/**")
                    .notMatch(typescriptPath)
                    .notMatchMethod("OPTIONS").check(fun -> StpUtil.checkLogin());
        });
        this.memberRepository = memberRepository;
    }

    @Override
    public List<String> getPermissionList(Object loginId, String loginType) {
        return memberRepository.findById((Integer) loginId).map(member -> Collections.singletonList(member.role().name())).orElse(Collections.emptyList());
    }

    @Override
    public List<String> getRoleList(Object loginId, String loginType) {
        return Collections.emptyList();
    }
}
