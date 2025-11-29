package com.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    USER,
    ADMIN;

    @JsonCreator
    public static Role fromString(String value) {
        if (value == null) return null;
        // ✅ Aceita tanto "USER" quanto "ROLE_USER"
        return switch (value.toUpperCase()) {
            case "USER", "ROLE_USER" -> USER;
            case "ADMIN", "ROLE_ADMIN" -> ADMIN;
            default -> throw new IllegalArgumentException("Invalid role: " + value);
        };
    }

    @JsonValue
    public String toValue() {
        return this.name();
    }
}
