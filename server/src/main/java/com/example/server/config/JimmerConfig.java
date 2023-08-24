package com.example.server.config;

import org.babyfish.jimmer.sql.dialect.Dialect;
import org.babyfish.jimmer.sql.dialect.MySqlDialect;
import org.babyfish.jimmer.sql.meta.DatabaseNamingStrategy;
import org.babyfish.jimmer.sql.runtime.DefaultDatabaseNamingStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JimmerConfig {
    @Bean
    public Dialect dialect() {
        return new MySqlDialect();
    }

    @Bean
    public DatabaseNamingStrategy databaseNamingStrategy() {
        return DefaultDatabaseNamingStrategy.LOWER_CASE;
    }
}
