package com.ecommerce.controller;

import com.ecommerce.model.Endereco;
import com.ecommerce.model.Role;
import com.ecommerce.model.Usuario;
import com.ecommerce.repository.EnderecoRepository;
import com.ecommerce.repository.UsuarioRepository;
import com.ecommerce.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // ===============================
    // 🧩 REGISTRO DE NOVO USUÁRIO
    // ===============================
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Usuario usuario) {
        try {
            // Verifica se o e-mail já existe
            Optional<Usuario> existingUser = usuarioRepository.findByEmailIgnoreCase(usuario.getEmail());
            if (existingUser.isPresent()) {
                return ResponseEntity.badRequest().body("❌ Email já cadastrado!");
            }

            // Define ROLE padrão (USER)
            if (usuario.getRole() == null) {
                usuario.setRole(Role.USER);
            }

            // Define status padrão
            if (usuario.getStatusCadastro() == null) {
                usuario.setStatusCadastro("ATIVO");
            }

            // Criptografa senha
            usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));

            // Salva o endereço (caso venha do front)
            if (usuario.getEndereco() != null) {
                Endereco enderecoSalvo = enderecoRepository.save(usuario.getEndereco());
                usuario.setEndereco(enderecoSalvo);
            }

            // Salva o usuário
            Usuario novoUsuario = usuarioRepository.save(usuario);

            return ResponseEntity.ok(novoUsuario);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("❌ Parâmetros inválidos ou erro ao salvar usuário.");
        }
    }

    // ===============================
    // 🔑 LOGIN
    // ===============================
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String senha = request.get("senha");

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, senha)
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtTokenProvider.generateToken(userDetails);

            Map<String, Object> response = new HashMap<>();
            response.put("usuario", userDetails.getUsername());
            response.put("roles", userDetails.getAuthorities());
            response.put("token", token);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(403).body("❌ Credenciais inválidas!");
        }
    }
}
