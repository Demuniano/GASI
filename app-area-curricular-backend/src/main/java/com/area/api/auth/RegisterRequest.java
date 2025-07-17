package com.area.api.auth;


public class RegisterRequest {
    String lastname;
    String firstname;
	String username;
	String password;
	
	public RegisterRequest(String lastname, String firstname, String username, String password) {
		this.lastname = lastname;
		this.firstname = firstname;
		this.username = username;
		this.password = password;
	}
	public RegisterRequest() {
	}
	
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
}
