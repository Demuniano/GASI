package com.area.api.auth;


public class AuthResponse {
    String token;
    String role;
    
	public AuthResponse(String token, String role) {
		this.token = token;
		this.role = role;
	}
	public AuthResponse(String token) {
		this.token = token;
	}
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	
}
