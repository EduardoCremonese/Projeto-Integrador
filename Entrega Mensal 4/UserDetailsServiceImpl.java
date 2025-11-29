package com.ecommerce.security;

import com.ecommerce.model.Usuario;
import com.ecommerce.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + email));

        String roleName = "ROLE_" + usuario.getRole().name();
        System.out.println("🔹 Autenticando usuário: " + email + " com role: " + roleName);

        return new User(
                usuario.getEmail(),
                usuario.getSenha(),
                Collections.singletonList(new SimpleGrantedAuthority(roleName))
        );
    }
}
