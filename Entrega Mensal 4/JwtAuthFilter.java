package com.ecommerce.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();

        if (path.startsWith("/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");
        System.out.println("\n🔹 [JwtAuthFilter] PATH: " + path);
        System.out.println("🔹 [JwtAuthFilter] HEADER: " + header);

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            String username = jwtTokenProvider.getUsernameFromToken(token);

            System.out.println("🔹 [JwtAuthFilter] TOKEN USERNAME: " + username);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if (jwtTokenProvider.validateToken(token)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities()
                            );

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);

                    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                    System.out.println("✅ [JwtAuthFilter] AUTH SET: " + auth.getName());
                    System.out.println("✅ [JwtAuthFilter] AUTHORITIES: " + auth.getAuthorities());
                } else {
                    System.out.println("❌ [JwtAuthFilter] TOKEN INVÁLIDO");
                }
            }
        } else {
            System.out.println("⚠️ [JwtAuthFilter] Sem header Authorization");
        }

        Authentication ctx = SecurityContextHolder.getContext().getAuthentication();
        if (ctx != null) {
            System.out.println("🎭 [JwtAuthFilter] CONTEXT AUTH: " + ctx.getName());
            System.out.println("🎭 [JwtAuthFilter] CONTEXT ROLES: " + ctx.getAuthorities());
        } else {
            System.out.println("🚫 [JwtAuthFilter] CONTEXT VAZIO");
        }

        filterChain.doFilter(request, response);
    }
}
