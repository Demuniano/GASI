package com.area.api.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.area.api.services.UserService;
import com.area.api.jwt.JwtService;
import com.area.api.models.UserModel;
import com.area.api.models.RoleModel;
@Service
public class AuthService {
	@Autowired
    private UserService userService;
	@Autowired
    private JwtService jwtService;
	@Autowired
    private PasswordEncoder passwordEncoder;
	@Autowired
    private AuthenticationManager authenticationManager;

	public AuthResponse login(LoginRequest request) {
	    authenticationManager.authenticate(
	        new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
	    );
	    UserDetails user = userService.getByUsername(request.getUsername()).orElseThrow();
	    String token = jwtService.getToken(user);

	    // Obtener el rol del usuario
	    String role = user.getAuthorities().stream()
	                    .map(GrantedAuthority::getAuthority)
	                    .findFirst()
	                    .orElse("ROLE_USER");

	    return new AuthResponse(token, role);
	}

	public AuthResponse register(RegisterRequest request) {
		UserModel user = new UserModel();
	    user.setusername(request.getUsername());
	    user.setPassword(passwordEncoder.encode(request.getPassword()));
	    user.setFirstname(request.getFirstname());
	    user.setLastname(request.getLastname());
	    user.setRole(RoleModel.USER);

	    userService.saveUser(user);

	    String token = jwtService.getToken(user);
	    return new AuthResponse(token);
	}


}
